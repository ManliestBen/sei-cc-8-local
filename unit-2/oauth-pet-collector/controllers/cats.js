const User = require('../models/user');

module.exports = {
    index,
    myCats,
    new: newCat
};

function index(req, res) {
    res.render('cats/index', {user: req.user})
}

function myCats(req, res) {
    res.render('cats/myCats', {user: req.user})
}

function newCat(req, res) {
    res.render('cats/new', {user: req.user})
}