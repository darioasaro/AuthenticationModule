/**
 * API for Authentication.
 * 
 * @desc -Create Server for Register and Login Users
 * @param {NodeModule} express - Module for server.
 * @param {function} app - Implement of Express Module.
 * @param {NpmModule} routes - Import Routes for App
 * @param {NpmModule} morgan - Allow logs for request
 * @param {NodeModule} process - Allow methods for get information about process
 * @param {NpmModule} bodyParser - Use it for decode Json's files
 */



const express = require('express')
const app = express()
require('dotenv').config()
const routes = require( '../routes/routes.js' )
const morgan = require('morgan')
const process = require('process')
const bodyParser = require('body-parser');
//----------//

//-----Sentences to Permite Cors-----//

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
  next();
});

//----------//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
routes(app);


app.get("*", (req, res) =>
  res.status(400).send({
    message: "No se encuentra el recurso"
  })
);


app.listen(process.env.EXPRESS_PORT, () => console.log(`Example app listening on port ${process.env.EXPRESS_PORT}!`));

