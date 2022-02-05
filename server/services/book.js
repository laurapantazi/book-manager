var models = require('../models')

const bookService = {
  async createBook(book) {
    try {
      let data = await models.book.build(book).save()
      return data
    } catch (error) {
      throw Error('Error while creating book')
    }
  },
  async getAllBooks() {
    try {
      let data = await models.book.findAll()
      return data
    } catch (error) {
      throw Error('Error while retrieving all books')
    }
  },
  async getBook(id) {
    try {
      let data = await models.book.findAll({ where: { book_id: id } })
      return data
    } catch (error) {
      throw Error('Error while retrieving book')
    }
  },
  async updateBook(id, book) {
    try {
      let data = await models.book.update(book, { where: { book_id: id } })
      return data
    } catch (error) {
      throw Error('Error while updating book')
    }
  },
  async paginate(params) {
    try {
      let data = await models.book.findAll({ ...params })
      return data
    } catch (error) {
      throw Error('Error while fetching books')
    }
  },
  async count() {
    try {
      let count = await models.book.count()
      return count
    } catch (error) {
      throw Error('Error with count')
    }
  },
  async paginateAndCount(params) {
    try {
      let data = await models.book.findAndCountAll({ ...params })
      return data
    } catch (error) {
      throw Error('Error while fetching books')
    }
  },
  async searchPaginateAndCount(offset, limit, params) {
    try {
      let x = this.condition(params)
      let data = await models.book.findAndCountAll({
        where: { $and: x },
        offset,
        limit
      })
      return data
    } catch (error) {
      throw Error('Error while fetching books')
    }
  },
  async searchPaginate(offset, limit, params) {
    try {
      let x = this.condition(params)
      let data = await models.book.findAll({
        where: { $and: x },
        offset,
        limit
      })
      return data
    } catch (error) {
      throw Error('Error while fetching books')
    }
  },
  condition(search_array) {
    var x = []
    for (let property in search_array) {
      let substringValue = `%${search_array[property]}%`
      let temp = { [property]: { $like: substringValue } }
      x.push(temp)
    }
    return x
  }
}

module.exports = bookService