var router = require('express').Router()
var UserController = require('../controllers/user')

router.post('/login', UserController.login)
router.post('/register', UserController.register)

module.exports = router
