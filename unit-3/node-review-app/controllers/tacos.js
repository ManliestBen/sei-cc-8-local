const Taco = require('../models/taco');

module.exports = {
    index, 
    create,
    update,
    show,
    delete: deleteOne
}

function index(req, res) {
    Taco.find({})
    .then(tacos => {res.json(tacos)})
    .catch(err => {res.status(500).json(err)})
}

function create(req, res) {
    Taco.create(req.body)
    .then(taco => {res.json(taco)})
    .catch(err => {res.status(500).json(err)})
}

function update(req, res) {
    Taco.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .then(taco => {res.json(taco)})
    .catch(err => {res.status(500).json(err)})
}

function show(req, res) {
    Taco.findById(req.params.id)
    .then(taco => {res.json(taco)})
    .catch(err => {res.status(500).json(err)})
}

function deleteOne(req, res) {
    Taco.findByIdAndDelete(req.params.id)
    .then(taco => {res.json(taco)})
    .catch(err => {res.status(500).json(err)})
}