var express = require('express');
var router = express.Router();
var recipesCtrl = require('../controllers/recipes');

router.get('/', recipesCtrl.index);
router.get('/search', recipesCtrl.search);
router.post('/search', recipesCtrl.apiCall);
router.post('/add', recipesCtrl.addRecipe);
router.get('/show/:id', recipesCtrl.showRecipe);
router.get('/shoppinglist', recipesCtrl.shoppingList);
router.post('/shoppinglist', recipesCtrl.addToShoppingList);
router.get('/shoppinglist/deletemode', recipesCtrl.listDeleteMode);
router.delete('/shoppinglist/:id', recipesCtrl.deleteShoppingItem);
router.get('/deletemode', recipesCtrl.indexDeleteMode);
router.delete('/:id', recipesCtrl.deleteRecipe);

module.exports = router;