var express = require('express');
var router = express.Router();
const passport = require('passport');

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/users',
    failureRedirect : '/users'
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/users');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {user : req.user});
});

module.exports = router;
