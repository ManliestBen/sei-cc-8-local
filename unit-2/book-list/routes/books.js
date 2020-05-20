var express = require('express');
var router = express.Router();
const booksCtrl = require('../controllers/books')

router.get('/', booksCtrl.index);
router.get('/:idx', booksCtrl.show);

module.exports = router;
