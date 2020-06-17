const Taco = require('../config/data');

module.exports = {
    index,
    // Add the rest of the functions here!
}


function index(req, res) {
    res.render('index', {tacos: Taco.getAll()});
}

// (...and here!)