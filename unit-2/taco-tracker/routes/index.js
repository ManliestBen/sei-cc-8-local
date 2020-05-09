var express = require('express');
var router = express.Router();
const tacosCtrl = require('../controllers/tacos')

/* GET home page. */

router.get('/', tacosCtrl.index);
router.post('/tacos', tacosCtrl.create);
router.delete('/tacos/:id', tacosCtrl.delete);
router.get('/tacos/:id', tacosCtrl.show);
router.put('/tacos/:id', tacosCtrl.update);



module.exports = router;
