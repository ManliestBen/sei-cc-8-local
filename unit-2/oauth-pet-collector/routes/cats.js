const router = require('express').Router();
const catsCtrl = require('../controllers/cats');

router.get('/', catsCtrl.index);
router.get('/myCats', catsCtrl.myCats);

module.exports = router;
