const router = require('express').Router();
const dogsCtrl = require('../controllers/dogs');

router.get('/', dogsCtrl.index);
router.get('/myDogs', dogsCtrl.myDogs);
router.get('/new', dogsCtrl.new);

module.exports = router;
