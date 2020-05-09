const recipeSearchId = process.env.RECIPE_SEARCH_ID;
const recipeSearchKey = process.env.RECIPE_SEARCH_KEY;
const nutritionalAnalysisId = process.env.NUTRITIONAL_ANALYSIS_ID;
const nutritionalAnalysisKey = process.env.NUTRITIONAL_ANALYSIS_KEY;
const foodDatabaseId = process.env.FOOD_DATABASE_ID;
const foodDatabaseKey = process.env.FOOD_DATABASE_KEY;

const axios = require('axios');
var Recipe = require('../models/recipe');
var ShoppingList = require('../models/shoppinglist');

module.exports = {
    search,
    apiCall,
    addRecipe,
    index,
    showRecipe,
    shoppingList,
    addToShoppingList,
    listDeleteMode,
    deleteShoppingItem,
    indexDeleteMode,
    deleteRecipe,

}

function search(req, res) {
    res.render('recipes/search');
}

function apiCall(req, res) {
    let query = req.body.query;
    axios.get(`https://api.edamam.com/search?q=${query}&app_id=${recipeSearchId}&app_key=${recipeSearchKey}&from=0&to=10`)
        .then(response => {
            let searchResults = response.data.hits;
            console.log(searchResults);
            res.render('recipes/searchresults', {recipes: searchResults})
        })
        .catch(error => {
            console.log(error);
        });
}

function addRecipe(req, res) {
    let edamam_id = req.body.edamam_id;
    axios.get(`https://api.edamam.com/search?r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_${edamam_id}&app_id=${recipeSearchId}&app_key=${recipeSearchKey}`)
    .then(response => {
        req.body.recipeDetails = response.data[0];
        req.body.recipeName = response.data[0].label;
        response.data[0].totalNutrients.SUGAR_added = response.data[0].totalNutrients['SUGAR.added'];
        delete response.data[0].totalNutrients['SUGAR.added'];
        var recipe = new Recipe(req.body);
        recipe.save(function(err) {
            if (err) return console.log(err);
        })
        console.log('Added recipe to database: ' + recipe);
        res.redirect('/recipes/search')
    })
    .catch(error => {
        console.log(error);
    });
}

function index(req, res) {
    Recipe.find({}, function(err, recipes) {
        if (err) {
            console.log(err);
        } else {
            res.render('recipes/index', {recipes: recipes});
        }
    });
}

function showRecipe(req, res) {
    Recipe.findById(req.params.id, function(err, recipe) {
        if (err) {
            console.log(err);
        } else {
            res.render('recipes/show', {recipe: recipe})
        }
    });
}

function shoppingList(req, res) {
    ShoppingList.find({}, function(err, listItems) {
        if (err) {
            console.log(err);
        } else {
            res.render('recipes/shoppinglist', {listItems: listItems});
        }
    });
}

function addToShoppingList(req, res) {
    req.body.listItems = req.body.listItems.split(',');
    ShoppingList.find({}, function(err, listItems) {
        if (err) {
            console.log(err);
        } else if (!listItems.length) {
            let shoppingList = new ShoppingList(req.body)
            shoppingList.save(function(err) {
                console.log('Created new list: ' + shoppingList);
                res.redirect('/recipes/shoppingList');
            });
        } else {
            req.body.listItems.forEach(function(i) {
                listItems[0].listItems.push(i);
            })
            listItems[0].save(function(err) {
                console.log('Added items to list');
            });
            res.redirect('/recipes/shoppinglist')
        }
    });
}

function listDeleteMode(req, res) {
    ShoppingList.find({}, function(err, listItems) {
        if (err) {
            console.log(err);
        } else {
            res.render('recipes/shoppinglistdelete', {listItems: listItems});
        }
    });
}

function deleteShoppingItem(req, res) {
    ShoppingList.find({}, function(err, listItems) {
        if (err) {
            console.log(err);
        } else {
            listItems[0].listItems.splice(req.params.id , 1);
            listItems[0].save(function(err) {
                console.log('Removed item from the list')
            })
            res.render('recipes/shoppinglistdelete', {listItems: listItems});
        }
    });
}

function indexDeleteMode(req, res) {
    Recipe.find({}, function(err, recipes) {
        if (err) {
            console.log(err);
        } else {
            res.render('recipes/indexdelete', {recipes: recipes});
        }
    });
}

function deleteRecipe(req, res) {
    Recipe.findByIdAndDelete(req.params.id, function(err, recipe){
        if (err) {
            console.log(err);
        } else {
        console.log('deleting: ' + recipe);
        res.redirect('/recipes/deletemode')
        }
    })
}