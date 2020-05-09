var express = require('express');
var router = express.Router();
var Ctrl = require('../controllers/controller');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/pokeapi', Ctrl.pokeView);
router.get('/nasaapi', Ctrl.nasaView);
router.get('/chartapi', Ctrl.chartView);
router.post('/nasaapi/query', Ctrl.nasaQuery);
router.post('/chartapi/query', Ctrl.chartQuery);
router.post('/pokeapi/query', Ctrl.pokeQuery);
module.exports = router;
