var express = require('express');
var router = express.Router();
const tacosCtrl = require('../controllers/tacos');

router.get('/tacos', tacosCtrl.index);
router.post('/tacos', tacosCtrl.create);
router.put('/tacos/:id', tacosCtrl.update);
router.get('/tacos/:id', tacosCtrl.show);
router.delete('/tacos/:id', tacosCtrl.delete)

module.exports = router;
