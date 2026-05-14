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
    movieId: {
        type:
            String,
        ref: 'Movie'
    },
    movieTitle: {
        type: String,
        required: true
    },
    theaterId: {
        type: String,
        ref: 'Theater'
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
    payment: {
        method: {
            type: String
        },
        transactionId: {
            type: String
        },
        amount: {
            type: Number
        },
        status: {
            type: String,
            enum: ['Paid', 'Pending', 'Failed'],
            default: 'Pending'
        },
        provider: { type: String }
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
    screenId: {
        type: String
    },
    showTime: {
        type: String
    },
    genres: {
        type: [String]
    },
    duration: {
        type: String
    },
    format: {
        type: String
    },
    user: { type: String, ref: 'User' }
}, { timestamps: true });

bookingSchema.pre('save', async function () {
    if (this.isNew && !this._id) {
        const counter = await Counter.findByIdAndUpdate(
            'booking',
            { $inc: { seq: 1 } },
            { returnDocument: 'after', upsert: true }
        );
        this._id = `booking_${String(counter.seq).padStart(2, '0')}`;
    }
});

module.exports = mongoose.model('Booking', bookingSchema);