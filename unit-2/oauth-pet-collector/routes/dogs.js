const router = require('express').Router();
const dogsCtrl = require('../controllers/dogs');

router.get('/', dogsCtrl.index);
router.get('/myDogs', dogsCtrl.myDogs);
router.get('/new', dogsCtrl.new);
router.post('/add', dogsCtrl.create);
router.delete('/:id', dogsCtrl.delete);
router.get('/:id/edit', dogsCtrl.edit);
router.put('/:id', dogsCtrl.update);

module.exports = router;
