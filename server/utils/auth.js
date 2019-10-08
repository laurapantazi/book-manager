var jwt = require('jsonwebtoken')
var secret = process.env.secret

let verify = (req, res, next) => {
  let token = req.headers.authorization
  if (token && token.startsWith('Bearer=')) {
    token = token.slice(7, token.length)
    try {
      let decoded = jwt.verify(token, secret)
      if (decoded && ((decoded.exp * 1000) > new Date().getTime())) {
        return next()
      }
    } catch (error) {
      return res.status(401).send({
        error: true,
        message: 'Token is not valid'
      })
    }
  }
  return res.status(401).send({
    error: true,
    message: 'Token is not valid'
  })
}

module.exports = {verify}