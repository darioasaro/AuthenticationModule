/**
 * @module AuthorizationController
 * @desc -Controller for Authorizacion, Login and Register request
 * @param database -Import database conection
 * @param bcrypt -Import bcrypt module for hash password
 * @param BCRYPT_SALT_ROUNDS -Number of Salt to hash password
 * @param config -Import secure data for autentication
 * @param generateToken -Import method for generate random token
 */

const database = require("../../service/database");
const bcrypt = require("bcrypt");
const BCRYPT_SALT_ROUNDS = 12;
const jwt = require("jsonwebtoken");
const config = require("../../config/config.js");
const { generateToken } = require("../../util/tokenGen.js");
const moment = require("moment");

/**
 * @method register
 * @desc -Register user on database
 * @param username -Name of user
 * @param password -Password of user until hash
 * @param hashedPass -Hashed password with bcrypt
 */
exports.register = async (req, res) => {
  var username = req.body.username.toLowerCase();
  var password = req.body.password;
  var id_role = req.body.id_role;
  database.getUser(username, (err, row) => {
    if (err) res.status(500).send("Internal Server Error");
    if (!row.length) {
      if (username && password) {
        bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPass => {
          try {
            database.insert(
              username,
              hashedPass,
              id_role,
              (error, response) => {
                if (error) throw error;
                else {
                  console.log("response", response);
                  res.status(201).json({ result: "OK", hashed: hashedPass });
                }
              }
            );
          } catch (err) {
            res.status(500).send("Internal Server Error");
          }
        });
      }
    } else {
      res.status(500).send("Usuario Ya existe");
    }
  });
};
/**
 * @method login
 * @desc -login user and set token
 * @param username -Name of user
 * @param password -Password of user
 * @param token -Access token generated with JWT module
 * @param refreshToken - Refresh token generated with internal function
 */
exports.login = async (req, res) => {
  var username = req.body.username.toLowerCase();
  var password = req.body.password;
  if (username && password) {
    try {
      await database.getUser(username, (err, row) => {
        if (err) res.status(500).send("Internal Server Error");
        console.log("row", row[0].password);
        bcrypt.compare(password, row[0].password).then(samePass => {
          if (!samePass) {
            res.status(403).send("Error Login");
          } else {
            us = {
              name: row[0].name,
              id_role: row[0].id_role
            };
            //--Create Token and Refresh Token--//
            const payload = {
              user: us,
              check: true
            };
            const token = jwt.sign(payload, config.key, {
              expiresIn: 300
            });
            const refreshToken = generateToken();
            database.insertRefresh(us.name, refreshToken, (err, row) => {
              if (err) res.status(500).send("Internal Server Error");
              res.status(200).json({
                result: "ok!",
                accesToken: token,
                refreshToken: refreshToken
              });
            });
            //-----//
          }
        });
      });
    } catch (e) {
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.status(400).send("Bad Request");
  }
};

exports.refresh = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  const username = req.body.username;
  database.getRefreshToken(username, refreshToken, (err, row) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      if (row.length > 0) {
        const expire = row[0].expires;
        if (moment().isSameOrBefore(expire)) {
          const payload = {
            user: row[0].name,
            check: true
          };
          const token = jwt.sign(payload, config.key, {
            expiresIn: 300
          });
          res.status(200).json({
            result: "ok!",
            accesToken: token
          });
        } else {
          res.status(401).send("token expired,please Re-login");
        }
      }
    }
  });
};

//---End point to test verification--//
exports.test = (req, res) => {
  const user = req.decoded.user;
  res.json({ result: "ok!", data: { user: user } });
};

exports.home = (req, res) => {
  res.send("Welcome to Authorization Module");
};
