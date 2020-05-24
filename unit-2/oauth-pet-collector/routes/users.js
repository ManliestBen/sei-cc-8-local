const router = require('express').Router();
const usersCtrl = require('../controllers/users');

// GET /users
router.get('/users', usersCtrl.index);


module.exports = router;
