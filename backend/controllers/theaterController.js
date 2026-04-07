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
