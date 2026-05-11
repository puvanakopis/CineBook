const mongoose = require('mongoose');
const Counter = require('./counterModel');

const seatSchema = new mongoose.Schema({
    id: {
        type: String
    },
    row: {
        type: String
    },
    number: {
        type: Number
    },
    type: {
        type: String
    },
    price: {
        type: Number
    }
}, { _id: false });

const bookingSchema = new mongoose.Schema({
    _id: {
        type: String
    },
    movieTitle: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    dateTime: {
        type: Date,
        required: true
    },
    seats: {
        type: [seatSchema],
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Confirmed', 'Pending', 'Cancelled'],
        default: 'Confirmed'
    },
    poster: {
        type: String
    },
    theaterName: {
        type: String
    },
    hallName: {
        type: String
    },
    screenId: {
        type: String
    },
    showTime: {
        type: String
    },
    user: { type: String, ref: 'User' }
}, { timestamps: true });

bookingSchema.pre('save', async function () {
    if (this.isNew && !this._id) {
        const counter = await Counter.findByIdAndUpdate(
            'booking',
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        this._id = `booking_${String(counter.seq).padStart(4, '0')}`;
    }
});

module.exports = mongoose.model('Booking', bookingSchema);
