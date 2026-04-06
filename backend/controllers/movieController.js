const Movie = require('../models/movieModel');

exports.createMovie = async (req, res) => {
    try {
        const movie = new Movie(req.body);
        await movie.save();
        res.status(201).json({ message: 'Movie created', movie });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
