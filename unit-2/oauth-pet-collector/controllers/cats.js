const User = require('../models/user');

module.exports = {
    index,
    myCats
};

function index(req, res) {
    res.render('cats/index', {user: req.user})
}

function myCats(req, res) {
    res.render('cats/myCats', {user: req.user})
}