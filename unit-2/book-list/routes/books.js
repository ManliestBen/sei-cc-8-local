var express = require('express');
var router = express.Router();
const booksCtrl = require('../controllers/books')

router.get('/', booksCtrl.index);
router.get('/new', booksCtrl.addPage);
router.get('/:idx', booksCtrl.show);
router.post('/add', booksCtrl.create);
router.delete('/:idx', booksCtrl.delete);
router.get('/edit/:idx', booksCtrl.editPage);
router.put('/edit/:idx', booksCtrl.update);

module.exports = router;
