var express = require('express');
var router = express.Router();
const usersCtrl = require('../controllers/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.user);
  res.render('index.ejs', {user : req.user});
});

router.get('/search', usersCtrl.renderSearch);

// router.get('/account', usersCtrl.viewAccount);
// router.get('/new', usersCtrl.addPet);

module.exports = router;
