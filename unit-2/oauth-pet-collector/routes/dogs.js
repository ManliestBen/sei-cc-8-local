const router = require('express').Router();
const dogsCtrl = require('../controllers/dogs');

router.get('/', isLoggedIn, dogsCtrl.index);
router.get('/myDogs', isLoggedIn, dogsCtrl.myDogs);
router.get('/new', isLoggedIn, dogsCtrl.new);
router.post('/add', isLoggedIn, dogsCtrl.create);
router.delete('/:id', isLoggedIn, dogsCtrl.delete);
router.get('/:id/edit', isLoggedIn, dogsCtrl.edit);
router.put('/:id', isLoggedIn, dogsCtrl.update);

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}

module.exports = router;
