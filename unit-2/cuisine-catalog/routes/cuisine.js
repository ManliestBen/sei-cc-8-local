var express = require('express');
var router = express.Router();
var cuisineCtrl = require('../controllers/cuisine');

router.get('/', cuisineCtrl.index);
router.get('/new', cuisineCtrl.new);
router.post('/', cuisineCtrl.create);
router.get('/:id', cuisineCtrl.show);
router.delete('/:id', cuisineCtrl.delete);
router.get('/update/:id', cuisineCtrl.showUpdate);
router.put('/update/:id', cuisineCtrl.update);

module.exports = router;
