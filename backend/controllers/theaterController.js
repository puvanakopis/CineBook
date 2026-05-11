const Theater = require("../models/theaterModel");
const Movie = require("../models/movieModel");
const fs = require("fs");
const path = require("path");

const validateMoviesInShows = async (screens) => {
    if (!screens || !Array.isArray(screens)) return true;

    for (const screen of screens) {
        if (screen.shows && Array.isArray(screen.shows)) {
            for (const show of screen.shows) {
                if (show.movie) {
                    const movieId = typeof show.movie === 'object' && show.movie._id ? show.movie._id : show.movie;
                    try {
                        const movieExists = await Movie.findById(movieId);
                        if (!movieExists) {
                            throw new Error(`Movie with ID ${movieId} not found`);
                        }
                    } catch (err) {
                        throw new Error(`Invalid movie reference in show: ${movieId}`);
                    }
                }
            }
        }
    }
    return true;
};

const parseTimeToMinutes = (timeStr) => {
    if (!timeStr || typeof timeStr !== 'string') return null;
    const normalized = timeStr.replace('.', ':');
    const parts = normalized.split(":");
    if (parts.length < 2) return null;
    const h = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10);
    if (Number.isNaN(h) || Number.isNaN(m)) return null;
    return h * 60 + m;
};

const validateShowsTimeRanges = (screens) => {
    if (!screens || !Array.isArray(screens)) return true;

    for (const screen of screens) {
        if (screen.shows && Array.isArray(screen.shows)) {
            for (const show of screen.shows) {
                if (!show.startTime || !show.endTime) {
                    throw new Error(`Show must include startTime and endTime`);
                }
                const start = parseTimeToMinutes(show.startTime);
                const end = parseTimeToMinutes(show.endTime);
                if (start === null || end === null) {
                    throw new Error(`Invalid time format for show times: ${show.startTime} - ${show.endTime}`);
                }
                if (start >= end) {
                    throw new Error(`Show startTime must be before endTime: ${show.startTime} >= ${show.endTime}`);
                }
            }
        }
    }
    return true;
};

const parseMaybeJson = (value) => {
    if (typeof value !== "string") return value;
    const trimmed = value.trim();
    if (!trimmed) return value;
    if ((trimmed.startsWith("[") && trimmed.endsWith("]")) || (trimmed.startsWith("{") && trimmed.endsWith("}"))) {
        try {
            return JSON.parse(trimmed);
        } catch (err) {
            return value;
        }
    }
    return value;
};

const normalizeTheaterBody = (body, imagePath) => {
    const normalized = { ...body };
    ["amenities", "screens", "reviews", "movies"].forEach((field) => {
        if (normalized[field] === undefined) return;
        const raw = normalized[field];

        if (Array.isArray(raw)) {
            normalized[field] = raw.map((item) => {
                if (typeof item === 'string') return parseMaybeJson(item);
                return item;
            }).map((item) => {
                if (typeof item === 'string') return parseMaybeJson(item);
                return item;
            });
        } else {
            const parsed = parseMaybeJson(raw);
            if (Array.isArray(parsed)) {
                normalized[field] = parsed.map((item) => parseMaybeJson(item));
            } else {
                normalized[field] = parsed;
            }
        }
    });

    if (normalized.screens && Array.isArray(normalized.screens)) {
        normalized.screens = normalized.screens.map((s) => {
            const screen = typeof s === 'string' ? parseMaybeJson(s) : s;
            if (screen && screen.shows && Array.isArray(screen.shows)) {
                screen.shows = screen.shows.map((sh) => (typeof sh === 'string' ? parseMaybeJson(sh) : sh));
            }
            return screen;
        });
    }

    if (imagePath) {
        normalized.image = imagePath;
    } else if (normalized.image === "") {
        delete normalized.image;
    }

    if (normalized.location && typeof normalized.location === 'string') {
        normalized.location = parseMaybeJson(normalized.location);
    }
    if (normalized.features && typeof normalized.features === 'string') {
        normalized.features = parseMaybeJson(normalized.features);
    }

    return normalized;
};

// movies field removed from Theater schema; no validation needed here

exports.getTheaters = async (req, res) => {
    try {
        const theaters = await Theater.find()
            .populate("screens.shows.movie");
        res.status(200).json(theaters);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getTheaterById = async (req, res) => {
    try {
        const theater = await Theater.findById(req.params.id)
            .populate("screens.shows.movie");
        if (!theater) return res.status(404).json({ message: "Theater not found" });
        res.status(200).json(theater);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createTheater = async (req, res) => {
    try {
        const normalized = normalizeTheaterBody(req.body, req.file ? req.file.path : req.body.image);

        if (normalized.screens) {
            await validateMoviesInShows(normalized.screens);
            validateShowsTimeRanges(normalized.screens);
        }
        // `movies` field removed from schema; ignore any movies property if present

        const newTheater = new Theater(normalized);
        await newTheater.save();

        if (req.file) {
            try {
                const ext = path.extname(req.file.originalname);
                const newPath = `uploads/theaters/${newTheater._id}${ext}`;
                fs.renameSync(req.file.path, newPath);
                newTheater.image = newPath;
                await newTheater.save();
            } catch (fsErr) {
                console.error('createTheater file move error:', fsErr);
            }
        }

        const populatedNew = await Theater.findById(newTheater._id).populate('screens.shows.movie');
        res.status(201).json({ message: 'Theater created', theater: populatedNew });
    } catch (err) {
        console.error('createTheater error:', err);
        if (err && err.name === 'ValidationError') {
            const errors = Object.keys(err.errors || {}).map((k) => ({ field: k, message: err.errors[k].message }));
            return res.status(400).json({ message: 'Validation failed', errors });
        }
        res.status(500).json({ message: err.message });
    }
};

exports.updateTheater = async (req, res) => {
    try {
        const normalized = normalizeTheaterBody(req.body, req.file ? req.file.path : req.body.image);

        if (normalized.screens) {
            await validateMoviesInShows(normalized.screens);
            validateShowsTimeRanges(normalized.screens);
        }
        // `movies` field removed from schema; ignore any movies property if present

        const theater = await Theater.findById(req.params.id);
        if (!theater) return res.status(404).json({ message: "Theater not found" });

        if (req.file && theater.image && fs.existsSync(theater.image)) {
            try { fs.unlinkSync(theater.image); } catch (e) { /* ignore */ }
        }

        Object.assign(theater, normalized);

        if (req.file) {
            try {
                const ext = path.extname(req.file.originalname);
                const newPath = `uploads/theaters/${theater._id}${ext}`;
                fs.renameSync(req.file.path, newPath);
                theater.image = newPath;
            } catch (fsErr) {
                console.error('updateTheater file move error:', fsErr);
            }
        }

        await theater.save();

        const populated = await Theater.findById(theater._id).populate('screens.shows.movie');
        res.status(200).json({ message: 'Theater updated', theater: populated });
    } catch (err) {
        console.error('updateTheater error:', err);
        if (err && err.name === 'ValidationError') {
            const errors = Object.keys(err.errors || {}).map((k) => ({ field: k, message: err.errors[k].message }));
            return res.status(400).json({ message: 'Validation failed', errors });
        }
        res.status(500).json({ message: err.message });
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

// updateTheaterMovies removed because `movies` was removed from the Theater schema

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