/**@method verification
 * @desc Middelware for check token from client
 * @param config -Import key for token check
 * @param jwt -Import module JsonWebToken
 */



const config = require('../config/config')
const jwt = require('jsonwebtoken')
/**
 * @method verificationToken 
 * @desc -Check token
 * @param token -Token from client
 */
exports.verificationToken = (req,res,next)=>{
    const token = req.headers.authorization
    console.log(req.headers.authorization)
    
    if (token) {
        jwt.verify(token, config.key, (err, decoded) => {      
          if (err) {
            return res.json({ mensaje: 'Token inválida' });    
          } else {
            req.decoded = decoded;    
            next();
          }
        });
      } else {
        res.send({ 
            mensaje: 'Token no identificada.' 
        });
      }

}