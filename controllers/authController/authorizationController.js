/**
 * @module AuthorizationController
 * @desc -Controller for Authorizacion, Login and Register request
 * @param database -Import database conection
 * @param bcrypt -Import bcrypt module for hash password
 * @param BCRYPT_SALT_ROUNDS -Number of Salt to hash password
 * @param config -Import secure data for autentication
 */

const database = require("../../service/database");
const bcrypt = require("bcrypt");
const BCRYPT_SALT_ROUNDS = 12;
const jwt = require("jsonwebtoken");
const config = require("../../config/config.js");

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
  var id_role = req.body.id_role
  database.getUser(username,(err,row)=>{
    if(err)res.status(500).send("Internal Server Error")
    if(!row.length){

      if (username && password) {
        bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
        .then((hashedPass)=>{

          try {
            database.insert(username,hashedPass,id_role, (error, response) => {
              if (error) throw error;
              else {
                console.log("response", response);
                res.status(201).json({ result: "OK", hashed: hashedPass });
              }
            });
          } catch (err) {
            res.status(500).send("Internal Server Error");
          }
        })
        
      }
    }
    else{
      res.status(500).send("Usuario Ya existe")
    }

  })
};
/**
 * @method login
 * @desc -login user and set token
 * @param username -Name of user
 * @param password -Password of user 
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
              name : row[0].name,
              id_role : row[0].id_role
            }
            console.log("datos",row[0])
            //--Create Token with user data and 24 hours to expired--//
            const payload = {
              user : us, 
              check:  true
             };
             const token = jwt.sign(payload, config.key, {
              expiresIn: 1440
             });
             //-----//
            res.status(200).json({result:"ok!",token:token});
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
//---End point to test verification--//
exports.test = (req,res)=>{
  const user = req.decoded.user
  res.json({result:"ok!",data:{"user":user}})

}
