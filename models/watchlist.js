const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const movieSchema = new Schema({
    photo: {type: String},
    title: {type: String, required: true},
    releaseYear: {type: String, required: true},
    director: {type: String, required: true},
    plot: {type: String},
}, {
    timestamps: true,
});

const watchlistSchema = new Schema({
    title: {type: String, required: true},
    movies: [movieSchema],
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
}, {
    timestamps: true,
});

module.exports = mongoose.model('Watchlist', watchlistSchema);