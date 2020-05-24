const router = require('express').Router();
const catsCtrl = require('../controllers/cats');

router.get('/', catsCtrl.index);
router.get('/myCats', catsCtrl.myCats);
router.get('/new', catsCtrl.new);
router.post('/add', catsCtrl.create);
router.get('/:idx/edit', catsCtrl.edit);
router.delete('/:idx', catsCtrl.delete);
router.put('/:idx', catsCtrl.update);

module.exports = router;
