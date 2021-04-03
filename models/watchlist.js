const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const movieSchema = new Schema({
    title: {type: String, required: true},
    director: {type: String, required: true},
    releaseYear: {type: Number, required: true},
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