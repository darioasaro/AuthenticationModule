/**
 * @module authorization
 * @desc have all routes for authorization
 * @param express -Import Express module 
 * @param router - Use Express Router
 * @param authController -Import controller about register and login
 */
const express = require( 'express' )
const router = express.Router()
const authController = require('../controllers/authController/authorizationController')
const {verificationToken} = require('../middelwares/verification.js')

router.post('/login', authController.login)
router.post('/register', authController.register)
router.get('/',verificationToken,authController.test)
router.get('/home',authController.home)
router.post('/refresh',authController.refresh)
router.post('/restore',authController.restore)
router.post('/change',authController.changePass)


module.exports = router