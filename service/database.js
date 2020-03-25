/**
 * @module dataBase
 * @desc -Implement methods for use database on app
 * @param database -Import client connection
 */
const dataBase = require('../config/connection')
const moment =  require('moment')

/**
 * @method insert
 * @desc insert new user on database
 * @param user -Name of user
 * @param password -Password of user(Hashed Password)
 * @callback - Callback for return results 
 */
exports.insert = (user,password,id_role,callback)=>{
    dataBase.connection.query(`INSERT INTO users (name,password,id_role) VALUES (?,?,?)`,
    [user,password,id_role],(err,rows)=>{
        if(err)throw err
        callback(err,rows)
    })

}


/**
 * @method getUser
 * @desc Search user on database
 * @param username -Name of user
 * @callback - Callback for return results 
 */

exports.getUser = (username,callback) => {
    let sql = `SELECT name,password,id_role FROM users WHERE name = (?)`;
    
    dataBase.connection.query(sql, [username], (err, rows) => {
      if (err) throw err;
      return callback(err, rows);
    });

  };

  exports.insertRefresh = (username,token,callback)=>{
    const expire= moment().add(1,"years").format('YYYY-MM-DD')

    const sql = `INSERT INTO refresh_tokens (name,token,banned,expires) VALUES(?,?,?,?)`
    dataBase.connection.query(sql,[username,token,0,expire],(err,row)=>{
        if(err)throw err;
        return callback(err,row)
    })
  }


  exports.getRefreshToken = (username,refreshToken,callback)=>{
    const sql = `SELECT name,expires from refresh_tokens WHERE name = ? AND token = ? AND banned = 0 `;
    dataBase.connection.query(sql,[username,refreshToken],(err,row)=>{
      if(err)throw err
      return callback(err,row)

    })
  }