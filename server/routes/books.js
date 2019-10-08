var router = require('express').Router()
var BookController = require('../controllers/book')
var auth = require('../utils/auth')

router.get('/', auth.verify, BookController.getAllBooks)
router.get('/:id', auth.verify, BookController.getBook)
router.put('/:id', auth.verify, BookController.updateBook)
router.post('/', auth.verify, BookController.createBook)
router.post('/paginate', auth.verify, BookController.paginate)
router.post('/paginate/count', auth.verify, BookController.paginateAndCount)
router.post('/search/paginate', auth.verify, BookController.searchPaginate)
router.post('/search/paginate/count', auth.verify, BookController.searchPaginateAndCount)

module.exports = router
