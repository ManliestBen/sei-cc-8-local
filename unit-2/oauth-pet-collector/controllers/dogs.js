const User = require('../models/user');
const Dog = require('../models/dog');

module.exports = {
    index,
    myDogs,
    new: newDog,
    create,
    delete: deleteOne,
    edit,
    update
};

function index(req, res) {
    Dog.find({}, function(err, dogs) {
        res.render('dogs/index', {user: req.user, dogs: dogs})
    })
}

function myDogs(req, res) {
    Dog.find({owner: req.user._id}, function(err, dogs) {
        res.render('dogs/myDogs', {user: req.user, dogs: dogs})
    })
}

function newDog(req, res) {
    res.render('dogs/new', {user: req.user})
}

function create(req, res) {
    req.body.owner = req.user._id;
    req.body.ownerName = req.user.name;
    const newDog = new Dog(req.body);
    newDog.save(function(err) {
        if (err) return res.redirect('/dogs/new');
        console.log(newDog);
        res.redirect('/dogs/myDogs');
    })
    
}

function deleteOne(req, res) {
    Dog.findByIdAndDelete(req.params.id, function(err) {
        res.redirect('/dogs/myDogs')
    })
}

function edit(req, res) {
    Dog.findById(req.params.id, function(err, dog) {
        res.render('dogs/update', {user: req.user, dog: dog})
    })
}

function update(req, res) {
    Dog.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err) {
        res.redirect('/dogs/myDogs')
    })
}