const mongoose = require("mongoose");
const Counter = require("./counterModel");

const CastSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        role: {
            type: String,
            required: true,
            trim: true
        },
        profilePicture: {
            type: String,
            required: true,
            trim: true
        }
    },
    { _id: false, timestamps: true }
);

const ReviewSchema = new mongoose.Schema(
    {
        user: {
            type: String,
            ref: "User",
            required: false
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5
        },
        message: {
            type: String,
            required: true
        }
    },
    { _id: false, timestamps: true }
);

const MovieSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            unique: true
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        genres: {
            type: [String],
            required: true
        },
        duration: {
            type: String,
            required: true
        },
        releaseDate: {
            type: String,
            required: true
        },
        languages: {
            type: [String],
            required: true
        },
        formats: {
            type: String,
            required: true
        },
        synopsis: {
            type: String,
            required: true
        },
        poster: {
            type: String,
            required: true
        },
        trailerUrl: {
            type: String,
            required: true
        },
        cast: {
            type: [CastSchema],
            default: []
        },
        reviews: {
            type: [ReviewSchema],
            default: []
        },
        isNowShowing: {
            type: Boolean,
            default: true
        },
        isUpcoming: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

MovieSchema.pre("save", async function () {
    if (this.isNew && !this._id) {
        const counter = await Counter.findByIdAndUpdate(
            "movie",
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        this._id = `movie_${String(counter.seq).padStart(2, "0")}`;
    }
});

module.exports = mongoose.model("Movie", MovieSchema);