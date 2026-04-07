const mongoose = require("mongoose");
const Counter = require("./counterModel");

const ShowSchema = new mongoose.Schema(
  {
    movie: { type: String, ref: "Movie", required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true, default: "LKR" },
    status: {
      type: String,
      enum: ["available", "sold-out", "almost-full", "fast-filling"],
      default: "available",
    },
  },
  { _id: false }
);

const ScreenSchema = new mongoose.Schema(
  {
    screen_id: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    shows: { type: [ShowSchema], default: [] },
  },
  { _id: false }
);

const FeaturesSchema = new mongoose.Schema(
  {
    mTicket: { type: Boolean, default: false },
    foodBeverage: { type: Boolean, default: false },
    parking: { type: Boolean, default: false },
    wheelchair: { type: Boolean, default: false },
    dolby: { type: Boolean, default: false },
    imax: { type: Boolean, default: false },
    recliners: { type: Boolean, default: false },
    fourK: { type: Boolean, default: false },
  },
  { _id: false }
);

const LocationSchema = new mongoose.Schema(
  {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  { _id: false }
);

const ReviewSchema = new mongoose.Schema(
  {
    user: { type: String, ref: "User", required: false },
    rating: { type: Number, required: true, min: 0, max: 5 },
    message: { type: String, required: true },
  },
  { _id: false, timestamps: true }
);

const TheaterSchema = new mongoose.Schema(
  {
    _id: { type: String },
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    amenities: { type: [String], default: [] },
    image: { type: String, required: true },
    description: { type: String, required: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    location: { type: LocationSchema, required: true },
    features: { type: FeaturesSchema, default: {} },
    screens: { type: [ScreenSchema], default: [] },
    reviews: { type: [ReviewSchema], default: [] },
  },
  { timestamps: true }
);

TheaterSchema.pre("save", async function () {
  if (this.isNew && !this._id) {
    const counter = await Counter.findByIdAndUpdate(
      "theater",
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this._id = `theater_${String(counter.seq).padStart(2, "0")}`;
  }
});

module.exports = mongoose.model("Theater", TheaterSchema);