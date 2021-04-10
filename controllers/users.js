const User = require('../models/user');
const Watchlist = require('../models/watchlist');
const fetch = require('node-fetch');

module.exports = {
  index,
  renderSearch,
  viewLists,
  newList,
  listDetails,
  getMovies,
  addMovie,
  editList,
  editTitle,
  deleteList,
  deleteMovie
}

function index(req, res, next) {

  let modelQuery = req.query.name ? { name: new RegExp(req.query.name, 'i') } : {};

  let sortKey = req.query.sort || 'name';
  User.find(modelQuery)
    .sort(sortKey).exec(function (err, users) {
      if (err) return next(err);

      res.render('user/index', {

        user: req.user,
        name: req.query.name,
        sortKey
      });
    });
}

function renderSearch(req, res) {
  res.render('search.ejs', { user: req.user })
}

async function viewLists(req, res) {
  if (req.user) {
    let myLists = await Watchlist.find({ userId: req.user.id })
    res.render('list.ejs', { user: req.user, myLists: myLists })
  } else {
    res.render('user-error.ejs', { user: req.user })
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
  let list = await Watchlist.findById(req.params.id)
  res.render('details.ejs', { user: req.user, list: list })
}

async function getMovies(req, res) {
  let search = req.query.title;
  let modSearch = search.split(" ").join("+")
  const response = await fetch(`https://omdbapi.com/?apikey=4c94e099&t=${modSearch}`);
  const result = await response.json();
  let lists = await Watchlist.find({ userId: req.user._id });
  res.render('results.ejs', { user: req.user, result: result, lists: lists })
}

async function addMovie(req, res) {
  let list = await Watchlist.findOne({title: req.body.list});
  let chosenMovie = {
    photo: req.body.photo,
    title: req.body.title,
    releaseYear: req.body.releaseYear,
    director: req.body.director,
    plot: req.body.plot,
  }
  list.movies.push(chosenMovie);
  await list.save()
  res.redirect('/users/search/')
}

async function editList(req, res) {
  let list = await Watchlist.findById(req.params.id)
  res.render('edit-list.ejs', {user: req.user, list: list})
}

async function editTitle(req, res) {
  let list = await Watchlist.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    userId: req.user.id
  });
  res.redirect('/users/lists');
}

async function deleteList(req, res) {
  let list = await Watchlist.findByIdAndDelete(req.params.id);
  console.log(list)
  res.redirect('/users/lists');
}

async function deleteMovie(req, res) {
  let list = await Watchlist.findById(req.body.movie)
  let doc = list.movies.id(req.params.id).remove()
  await list.save()
  res.redirect('/users/lists')
}