const User = require('../models/user');
const Watchlist = require('../models/watchlist');

module.exports = {
    index,
    renderSearch,
    viewLists,
    newList,
}

function index(req, res, next) {
    console.log(req.user);

    let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};

    let sortKey = req.query.sort || 'name';
    User.find(modelQuery)
    .sort(sortKey).exec(function(err, users) {
      if (err) return next(err);

      res.render('user/index', { 
      
        user: req.user, 
        name: req.query.name, 
        sortKey });
    });
  }

  function renderSearch(req, res) {
    res.render('search.ejs', {user: req.user})
  }

  async function viewLists(req, res) {
    if (req.user) {
      let myLists = await Watchlist.find({userId: req.user.id})
      res.render('list.ejs', {user: req.user, myLists: myLists})
    } else {
      res.render('user-error.ejs', {user: req.user})
    }
  }

  async function newList(req, res) {
    await Watchlist.create({
      title: req.body.title,
      userId: req.user.id
    })
    res.redirect('/users/lists');
  }

  async function listDetails(req, res) {
    let list = await Watchlist.findById(req.params.id);
    res.render('/details.ejs', {user: req.user, list: list})
  }