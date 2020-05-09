var Cuisine = require('../models/cuisine');

module.exports = {
    new: newCuisine,
    create,
    index,
    show,
    delete: deleteOne,
    showUpdate,
    update
}


function newCuisine(req, res) {
    res.render('cuisine/new');
}

function create(req, res) {
    req.body.ingredients = req.body.ingredients.replace(/\s*,\s*/g, ',');
    if (req.body.ingredients) req.body.ingredients = req.body.ingredients.split(',');
    var cuisine = new Cuisine(req.body);
    cuisine.save(function(err) {
        if (err) return res.render('cuisine/new');
        console.log('Added cuisine to database: ' + cuisine);
        res.redirect('/cuisine');
    });
}

function index(req, res) {
    Cuisine.find({}, function(err, cuisine) {
        if (err) {
            console.log(err);
        } else {
        res.render('cuisine/index', {title: 'Cuisine List', cuisine});
        }
    });
}

function show(req, res) {
    Cuisine.findById(req.params.id, function(err, cuisine){
        if (err) {
            console.log(err);
        } else {
        res.render('cuisine/show', {title: 'Cuisine Details', cuisine});
        }
    });
}

function deleteOne(req, res) {
    Cuisine.findByIdAndDelete(req.params.id, function(err, cuisine){
        if (err) {
            console.log(err);
        } else {
        console.log('deleting: ' + cuisine);
        }
    })
    res.redirect('/cuisine')
}

function showUpdate(req, res) {
    Cuisine.findById(req.params.id, function(err, cuisine) {
        if (err) {
            console.log(err);
        } else {
        res.render('cuisine/update', {title: 'Update Cuisine', cuisine});
        }
    });
    
}
function update(req, res) {
    console.log(req.body);
    req.body.ingredients = req.body.ingredients.replace(/\s*,\s*/g, ',');
    if (req.body.ingredients) req.body.ingredients = req.body.ingredients.split(',');
    Cuisine.findByIdAndUpdate(req.params.id,
        {
            title: req.body.title,
            calories: req.body.calories,
            mealType: req.body.mealType,
            recipeUrl: req.body.recipeUrl,
            ingredients: req.body.ingredients
        },
        {new: true},
        function(err, response) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/cuisine')
            }
        })
}