const Movie = require("../models/movieModel");
const Theater = require("../models/theaterModel");
const fs = require("fs");
const path = require("path");

const parseMaybeJson = (value) => {
    if (typeof value !== "string") {
        return value;
    }

    const trimmed = value.trim();
    if (!trimmed) {
        return value;
    }

    if (
        (trimmed.startsWith("[") && trimmed.endsWith("]")) ||
        (trimmed.startsWith("{") && trimmed.endsWith("}"))
    ) {
        try {
            return JSON.parse(trimmed);
        } catch (error) {
            return value;
        }
    }

    return value;
};

const normalizeMovieBody = (body, posterPath) => {
    const normalizedBody = { ...body };

    ["genres", "languages", "cast", "reviews"].forEach((field) => {
        if (normalizedBody[field] === undefined) {
            return;
        }

        const parsedValue = parseMaybeJson(normalizedBody[field]);
        if (Array.isArray(parsedValue)) {
            normalizedBody[field] = parsedValue.map((item) => parseMaybeJson(item));
        } else {
            normalizedBody[field] = parsedValue;
        }
    });

    if (posterPath) {
        normalizedBody.poster = posterPath;
    } else if (normalizedBody.poster === "") {
        delete normalizedBody.poster;
    }

    return normalizedBody;
};

exports.createMovie = async (req, res) => {
    try {
        const movie = new Movie(normalizeMovieBody(req.body, req.file ? req.file.path : req.body.poster));
        await movie.save();

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

        Object.assign(movie, normalizeMovieBody(req.body, req.file ? req.file.path : undefined));

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

        await movie.deleteOne();

        res.status(200).json({ message: "Movie deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addReview = async (req, res) => {
    try {
        const { rating, message } = req.body;

        if (!rating || !message) {
            return res.status(400).json({
                message: "Rating and message are required"
            });
        }

        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({
                message: "Movie not found"
            });
        }

        const review = {
            user: req.user ? req.user._id : null,
            rating,
            message
        };

        movie.reviews.push(review);

        await movie.save();

        res.status(201).json({
            message: "Review added successfully",
            reviews: movie.reviews
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};