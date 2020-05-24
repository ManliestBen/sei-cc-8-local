const User = require('../models/user');

module.exports = {
    index,
    myCats,
    new: newCat,
    create,
    edit,
    delete: deleteOne,
    update
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

function edit(req, res) {
    User.findById(req.user._id, function(err, usersCat) {  
        res.render('cats/update', {user: req.user, cat: usersCat.cats[req.params.idx], idx: req.params.idx})
    })
}

function deleteOne(req, res) {
    User.findById(req.user._id, function(err, userDeleting) {
        userDeleting.cats.splice(req.params.idx, 1);
        userDeleting.save(function(err) {
            res.redirect('/cats/myCats');
        })
    })
}

function update(req, res) {
    User.findById(req.user._id, function(err, usersCat) {
        usersCat.cats.splice(req.params.idx, 1, req.body);
        usersCat.save(function(err) {
            res.redirect('/cats/myCats');
        })
    })
}