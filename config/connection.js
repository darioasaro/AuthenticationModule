/**
 * Connection to DataBase.
 * @module Connection
 * @desc -Create Conection for use database
 * @param mysql -Import module mysql
 */
const mysql = require("mysql2");

/**
 * @method connection
 * @desc -For implement conection and use module on app
 * @param {String} host  -Name host of database client
 * @param {String} user -Name of User
 * @param {String} password - Password to open data base client
 * @param {String} database - Name of database to use
 */
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER ,
  password: process.env.DB_PASSWORD ,
  database: process.env.DB_NAME || "authmodule"
});

/**
 * @method connect
 * @desc -Implement connection to database client
 */
connection.connect(err => {
  if (err) {
    console.log("Error connecting to Db" + err);
    return;
  }
  console.log("Connection established");
});

exports.connection = connection;