const Books = require('../data/books');

module.exports = {
    index,
    show
};


function index(req, res) {
    // res.render('path to the view', {object passed to the path})
    res.render('books/index', { books: Books.getAll() })
}

function show(req, res) {
    res.render('books/show', { book: Books.getOne(req.params.idx)})
}