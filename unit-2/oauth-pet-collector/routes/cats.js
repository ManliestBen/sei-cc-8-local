const router = require('express').Router();
const catsCtrl = require('../controllers/cats');

router.get('/', catsCtrl.index);
router.get('/myCats', catsCtrl.myCats);
router.get('/new', catsCtrl.new);

module.exports = router;
