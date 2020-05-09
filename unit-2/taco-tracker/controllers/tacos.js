const Taco = require('../config/data');

module.exports = {
    create,
    index,
    delete: deleteOne,
    show,
    update
}

function create(req, res) {
    req.body.yummy = false;
    console.log(req.body);
    Taco.create(req.body);
    res.redirect('/')
}

function index(req, res) {
    res.render('index', {tacos: Taco.getAll()});
}

function deleteOne(req, res) {
    Taco.deleteOne(req.params.id);
    res.redirect('/');
}

function show(req, res) {
    res.render('show', {taco: Taco.getOne(req.params.id), idx: req.params.id})
}

function update(req, res) {
    Taco.update(req.params.id, req.body);
    res.redirect('/');
}