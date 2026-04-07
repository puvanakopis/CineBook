const Movie = require("../models/movieModel");
const fs = require("fs");
const path = require("path");

exports.createMovie = async (req, res) => {
    try {
        const movie = new Movie(req.body);
        await movie.save();

        if (req.file) {
            const ext = path.extname(req.file.originalname);
            const newPath = `uploads/movies/${movie._id}${ext}`;

            fs.renameSync(req.file.path, newPath);

            movie.poster = newPath;
            await movie.save();
        }

        res.status(201).json({ message: "Movie created", movie });
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
        if (!movie) return res.status(404).json({ message: "Movie not found" });
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateMovie = async (req, res) => {
    try {
        let movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: "Movie not found" });

        if (req.file && movie.poster) {
            if (fs.existsSync(movie.poster)) {
                fs.unlinkSync(movie.poster);
            }
        }

        Object.assign(movie, req.body);

        if (req.file) {
            const ext = path.extname(req.file.originalname);
            const newPath = `uploads/movies/${movie._id}${ext}`;

            fs.renameSync(req.file.path, newPath);
            movie.poster = newPath;
        }

        await movie.save();

        res.status(200).json({ message: "Movie updated", movie });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: "Movie not found" });

        if (movie.poster && fs.existsSync(movie.poster)) {
            fs.unlinkSync(movie.poster);
        }

        await movie.deleteOne();

        res.status(200).json({ message: "Movie deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};