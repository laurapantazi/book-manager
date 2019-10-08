require('dotenv').config
var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()

app.use(bodyParser.json())
app.use(cors())

var books = require('./routes/books')
var users = require('./routes/users')
app.use('/users', users)
app.use('/books', books)

module.exports = {
  app
}
