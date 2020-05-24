var router = require('express').Router();
var passport = require('passport');


// The root route renders our only view
router.get('/', function(req, res) {
  res.redirect('/users');
});

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/users',
    failureRedirect : '/users'
  }
));

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/users');
});


module.exports = router;