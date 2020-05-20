const Books = require('../data/books');

module.exports = {
    index,
    show,
    addPage,
    create,
    delete: deleteOne,
    editPage,
    update
};

function update(req, res) {
    Books.update(req.params.idx, req.body);
    res.redirect('/books');
}

function editPage(req, res) {
    res.render('books/update', {book: Books.getOne(req.params.idx), idx: req.params.idx})
}

function create(req, res) {
    Books.add(req.body);
    res.redirect('/books')
}

function index(req, res) {
    // res.render('path to the view', {object passed to the path})
    res.render('books/index', { books: Books.getAll() })
}

function show(req, res) {
    res.render('books/show', { book: Books.getOne(req.params.idx), idx: req.params.idx})
}

function addPage(req ,res) {
    res.render('books/new')
}

function deleteOne(req, res) {
    Books.deleteOne(req.params.idx);
    res.redirect('/books')
}
