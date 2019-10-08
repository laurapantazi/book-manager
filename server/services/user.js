var models = require('../models')

const userService = {
  async login (user) {
    let {username, password} = user
    try {
      let user = await models.user.findOne({where: {username: username}})
      return user
    } catch (error) {
      throw Error('Error in login')
    }
  },
  async register (user) {
    try {
      let data = await models.user.build(user).save()
      return data
    } catch (error) {
      throw Error('Error in register')
    }
  }
}

module.exports = userService