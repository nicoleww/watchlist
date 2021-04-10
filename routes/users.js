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
router.get('/search/movies', usersCtrl.getMovies);
router.get('/edit/:id', usersCtrl.editList);

router.post('/new', usersCtrl.newList);
router.post('/add', usersCtrl.addMovie);
router.post('/edit-title/:id', usersCtrl.editTitle);

router.delete('/delete/:id', usersCtrl.deleteList);
router.delete('/deletemovie/:id', usersCtrl.deleteMovie);


module.exports = router;
