const Theater = require("../models/theaterModel");
const Movie = require("../models/movieModel");

const validateMoviesInShows = async (screens) => {
    if (!screens || !Array.isArray(screens)) return true;

    for (const screen of screens) {
        if (screen.shows && Array.isArray(screen.shows)) {
            for (const show of screen.shows) {
                if (show.movie) {
                    const movieExists = await Movie.findById(show.movie);
                    if (!movieExists) {
                        throw new Error(`Movie with ID ${show.movie} not found`);
                    }
                }
            }
        }
    }
    return true;
};

exports.getTheaters = async (req, res) => {
    try {
        const theaters = await Theater.find();
        res.status(200).json(theaters);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getTheaterById = async (req, res) => {
    try {
        const theater = await Theater.findById(req.params.id);
        if (!theater) return res.status(404).json({ message: "Theater not found" });
        res.status(200).json(theater);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createTheater = async (req, res) => {
    try {
        if (req.body.screens) {
            await validateMoviesInShows(req.body.screens);
        }

        const newTheater = new Theater(req.body);
        await newTheater.save();
        res.status(201).json(newTheater);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateTheater = async (req, res) => {
    try {
        if (req.body.screens) {
            await validateMoviesInShows(req.body.screens);
        }

        const theater = await Theater.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!theater) return res.status(404).json({ message: "Theater not found" });
        res.status(200).json(theater);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteTheater = async (req, res) => {
    try {
        const theater = await Theater.findByIdAndDelete(req.params.id);
        if (!theater) return res.status(404).json({ message: "Theater not found" });
        res.status(200).json({ message: "Theater deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addReview = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "User must be authenticated to add a review" });
        }

        if (req.user.role !== 'user') {
            return res.status(403).json({ message: "Only users can add reviews" });
        }

        const theater = await Theater.findById(req.params.id);
        if (!theater) return res.status(404).json({ message: "Theater not found" });

        if (!req.body.rating || !req.body.message) {
            return res.status(400).json({ message: "Rating and message are required" });
        }

        if (req.body.rating < 0 || req.body.rating > 5) {
            return res.status(400).json({ message: "Rating must be between 0 and 5" });
        }

        theater.reviews.push({
            user: req.user._id,
            rating: req.body.rating,
            message: req.body.message,
        });

        await theater.save();
        res.status(201).json(theater);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};