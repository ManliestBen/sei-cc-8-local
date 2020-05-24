const User = require('../models/user');
const Dog = require('../models/dog');

module.exports = {
    index,
    myDogs,
    new: newDog,
    create,
    delete: deleteOne,
    edit,
    update,
    show,
    comment,
    deleteComment
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

function show(req, res) {
    Dog.findById(req.params.id, function(err, dog) {
        res.render('dogs/show', {user: req.user, dog: dog})
    })
}

function comment(req, res) {
    Dog.findById(req.params.id, function(err, dog) {
        req.body.commentBy = req.user.name;
        req.body.commentById = req.user._id;
        dog.comments.push(req.body);
        dog.save(function(err) {
            res.redirect(`/dogs/${req.params.id}`)
        })
    })
}

function deleteComment(req, res) {
    Dog.findById(req.params.id, function(err, dog) {
        dog.comments.splice(req.params.idx, 1);
        dog.save(function(err) {
            res.redirect(`/dogs/${req.params.id}/edit`)
        })
    })
}