var express = require('express');
var router = express.Router();
const usersCtrl = require('../controllers/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.user);
  res.render('index.ejs', {user : req.user});
});

router.get('/search', usersCtrl.renderSearch);
router.get('/lists', usersCtrl.viewLists);
router.get('/list/:id', usersCtrl.listDetails);

router.post('/new', usersCtrl.newList);


module.exports = router;
