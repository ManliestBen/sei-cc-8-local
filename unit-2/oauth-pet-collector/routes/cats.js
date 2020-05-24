const router = require('express').Router();
const catsCtrl = require('../controllers/cats');

router.get('/', isLoggedIn, catsCtrl.index);
router.get('/myCats', isLoggedIn, catsCtrl.myCats);
router.get('/new', isLoggedIn, catsCtrl.new);
router.post('/add', isLoggedIn, catsCtrl.create);
router.get('/:idx/edit', isLoggedIn, catsCtrl.edit);
router.delete('/:idx', isLoggedIn, catsCtrl.delete);
router.put('/:idx', isLoggedIn, catsCtrl.update);
router.get('/:userid/:catid', isLoggedIn, catsCtrl.show);
router.post('/:userid/:catid/comment', isLoggedIn, catsCtrl.comment);
router.delete('/:userid/:catid/:catidx/:commentidx', isLoggedIn, catsCtrl.deleteComment);

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}

module.exports = router;
