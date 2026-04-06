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

exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        res.status(200).json({ message: 'Movie updated', movie });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        res.status(200).json({ message: 'Movie deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};