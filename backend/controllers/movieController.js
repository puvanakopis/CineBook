const Movie = require("../models/movieModel");
const Theater = require("../models/theaterModel");
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

        const theaters = await Theater.find({
            "screens.shows.movie": req.params.id,
        });

        const showings = theaters.map((theater) => {
            const relevantScreens = theater.screens
                .map((screen) => {
                    const relevantShows = screen.shows.filter(
                        (show) => show.movie === req.params.id
                    );
                    return {
                        ...screen.toObject(),
                        shows: relevantShows,
                    };
                })
                .filter((screen) => screen.shows.length > 0);

            return {
                theaterId: theater._id,
                name: theater.name,
                address: theater.address,
                city: theater.city,
                screens: relevantScreens,
            };
        }).filter(showing => showing.screens.length > 0);

        const movieWithShowings = {
            ...movie.toObject(),
            showings,
        };

        res.status(200).json(movieWithShowings);
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