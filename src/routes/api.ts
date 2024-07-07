import express from 'express'
const router = express.Router()

/**
 *** Controllers
 **/
const BaseController = require('../Controllers/BaseController')
const UserController = require('../Controllers/UserController')
const AuthController = require('../Controllers/AuthController')

router.all('/', function (req, res, next) {
  res.json({ success: true, message: 'Welcome to Xpress' })
})

router.all('/list', function (req, res, next) {
  res.json({ success: true, message: router.stack })
})

router.get('/auth', AuthController.authenticate)
router.get('/auth/decode', AuthController.decode) // for testing only
router.get('/user/products', UserController.products)
router.get('/user/profile', UserController.profile)

module.exports = router
