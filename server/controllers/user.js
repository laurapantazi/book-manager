var models = require('../models/')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
var userService = require('../services/user')

const UserController = {
  login (req, res) {
    const {username, password} = req.body
    if (!username || !password) {
      return res.status(500).json({
        error: true,
        message: 'Username and password are required.'
      })
    }
    else {
      userService.login({username, password})
      .then(user =>{
        if (!user) {
          return res.status(403).json({
            error: true,
            message: 'Incorrect username or password'
          })
        } else {
          var userFound = user.dataValues
          bcrypt.compare(password, userFound.password)
          .then(function (isMatch) {
            if (isMatch) {
              let token = jwt.sign({
                firstname: userFound.firstname,
                lastname: userFound.lastname
              }, process.env.secret, {
                expiresIn: 86400 // 24 hours
              })
              return res.status(200).send({
                error: false,
                message: 'Successful authentication',
                auth: true,
                token: token
              })
            } else {
              return res.status(403).send({
                error: true,
                message: "Incorrect username or password"
              })
            }
          })
          .catch(error => {
            return res.status(500).send({
              error: true,
              message: `Incorrect username or password ${error.message}`
            })
          })
        }
      })
      .catch(error => {
        return res.status(500).send({
          error: true,
          message: `Incorrect username or password ${error.message}`
        })
      })
    }
  },
  register (req, res) {
    const { 
      firstname,
      lastname,
      username,
      email,
      password } = req.body
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err)
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) return next(err)
        models.user.build({
          firstname: firstname,
          lastname: lastname,
          username: username,
          email: email,
          password: hash
        })
        .save()
        .then(i =>{
          var token = jwt.sign({username: username}, process.env.secret, {expiresIn: '24h'})
          return res.status(200).json({
            error: false, 
            auth: true,
            token: token
          })
        })
        .catch(error => {
          return res.status(500).json({
            error: true, 
            message: error.message
          })
        })
      })
    })
  }
}

module.exports = UserController