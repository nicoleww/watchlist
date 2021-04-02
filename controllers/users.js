const User = require('../models/user');

module.exports = {
    index,
    renderSearch,
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