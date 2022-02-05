var BookService = require('../services/book')

const BookController = {
  createBook(req, res) {
    let book = {
      title: req.body.title,
      author: req.body.author,
      country: req.body.country,
      language: req.body.language,
      pages: req.body.pages,
      year: req.body.year
    }
    BookService.createBook(book)
      .then(response => {
        return res.status(200).json({
          error: false,
          message: 'Successfully added new book'
        })
      })
      .catch(error => {
        return res.status(500).json({
          error: true,
          message: error.message
        })
      })
  },
  getAllBooks(req, res) {
    BookService.getAllBooks()
      .then(books => {
        return res.status(200).json({
          error: false,
          books
        })
      })
      .catch(error => {
        return res.status(500).json({
          error: true,
          message: error.message
        })
      })
  },
  getBook(req, res) {
    let book_id = req.params.id
    BookService.getBook(book_id)
      .then(book => {
        return res.status(200).json({
          error: false,
          book
        })
      })
      .catch(error => {
        return res.status(500).json({
          error: true,
          message: error.message
        })
      })
  },
  updateBook(req, res) {
    let book_id = req.params.id
    let book = {
      ...req.body
    }
    BookService.updateBook(book_id, book)
      .then(book => {
        return res.status(200).json({
          error: false,
          book
        })
      })
      .catch(error => {
        return res.status(500).json({
          error: true,
          message: error.message
        })
      })
  },
  paginate(req, res) {
    let { offset, limit } = req.body
    BookService.paginate({ offset, limit })
      .then(books => {
        return res.status(200).json({
          error: false,
          books
        })
      })
      .catch(error => {
        return res.status(500).json({
          error: true,
          message: error.message
        })
      })
  },
  paginateAndCount(req, res) {
    let { offset, limit } = req.body
    BookService.paginateAndCount({ offset, limit })
      .then(response => {
        let { rows, count } = response
        return res.status(200).json({
          error: false,
          books: rows,
          count: count
        })
      })
      .catch(error => {
        return res.status(500).json({
          error: true,
          message: error.message
        })
      })
  },
  searchPaginate(req, res) {
    let { offset, limit, search_array } = req.body
    BookService.searchPaginate(offset, limit, search_array)
      .then(books => {
        return res.status(200).json({
          error: false,
          books
        })
      })
      .catch(error => {
        return res.status(500).json({
          error: true,
          message: error.message
        })
      })
  },
  searchPaginateAndCount(req, res) {
    let { offset, limit, search_array } = req.body
    BookService.searchPaginateAndCount(offset, limit, search_array)
      .then(response => {
        return res.status(200).json({
          error: false,
          books: response.rows,
          count: response.count
        })
      })
      .catch(error => {
        return res.status(500).json({
          error: true,
          message: error.message
        })
      })

  }
}

module.exports = BookController