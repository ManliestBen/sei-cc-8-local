const User = require('../models/user');

module.exports = {
    index,
    myCats,
    new: newCat,
    create
};

function index(req, res) {
    res.render('cats/index', {user: req.user})
}

function myCats(req, res) {
    User.findById(req.user._id, function(err, usersCats) {
        res.render('cats/myCats', {user: req.user, cats: usersCats.cats})
    })
}

function newCat(req, res) {
    res.render('cats/new', {user: req.user})
}

function create(req, res) {
    User.findById(req.user._id, function(err, userAdding) {
        req.body.owner = req.user.name;
        userAdding.cats.push(req.body);
        userAdding.save(function(err) {
            res.redirect('/cats/myCats')
        })
    });
}