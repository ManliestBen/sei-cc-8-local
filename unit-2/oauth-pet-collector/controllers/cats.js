const User = require('../models/user');

module.exports = {
    index,
    myCats,
    new: newCat,
    create,
    edit,
    delete: deleteOne,
    update,
    show,
    comment,
    deleteComment
};

function index(req, res) {
    User.find({}, function(err, users) {
        res.render('cats/index', {user: req.user, users: users})
    })
}

function myCats(req, res) {
    res.render('cats/myCats', {user: req.user, cats: req.user.cats})
}

function newCat(req, res) {
    res.render('cats/new', {user: req.user})
}

function create(req, res) {
    req.body.owner = req.user.name;
    req.user.cats.push(req.body);
    req.user.save(function(err) {
        res.redirect('/cats/myCats')
    })
}

function edit(req, res) {
    res.render('cats/update', {user: req.user, cat: req.user.cats[req.params.idx], idx: req.params.idx})
}

function deleteOne(req, res) {
    req.user.cats.splice(req.params.idx, 1);
    req.user.save(function(err) {
        res.redirect('/cats/myCats');
    })
}

function update(req, res) {
    req.user.cats.splice(req.params.idx, 1, req.body);
    req.user.save(function(err) {
        res.redirect('/cats/myCats');
    })
}

function show(req, res) {
    req.user.cats.forEach(function(c) {
        if (c._id == req.params.catid) {
            res.render('cats/show', {user: req.user, cat: c, ownerid: req.params.userid})
        }
    })
}

function comment(req, res) {
   req.user.cats.forEach(function(c) {
        if (c._id == req.params.catid) {
            req.body.commentBy = req.user.name;
            req.body.commentById = req.user._id;
            c.comments.push(req.body);
            req.user.save(function(err) {
                res.redirect(`/cats/${req.params.userid}/${req.params.catid}`)
            })
        }
    })
}

function deleteComment(req, res) {
    req.user.cats.forEach(function(c) {
        if (c._id == req.params.catid) {
            c.comments.splice(req.params.idx, 1);
            req.user.save(function(err) {
                res.redirect(`/cats/${req.params.catidx}/edit`)
            })
        }
    })
}