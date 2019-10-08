'use strict';

var fs        = require('fs')
var path      = require('path')
var Sequelize = require('sequelize')
var sequelize = require('../server')
var basename  = path.basename(__filename)
var env       = process.env.NODE_ENV || 'development'
var config    = require('../config/config.js')[env]
var db        = {}
const Op = Sequelize.Op

if (config.use_env_variable) {
  var sequelize = new Sequelize(config.use_env_variable)
} else {
    var sequelize = new Sequelize(
      config.db_name,
      config.db_username,
      config.db_password,
      {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        },
      });
      sequelize.authenticate()
    .then(()=>{ console.log("Connection successful"); })
    .catch((err)=>{ console.error("Unable to connect.", err);})  
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;       
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db