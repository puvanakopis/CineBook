const Booking = require('../models/bookingModel');
const User = require('../models/userModel');

exports.createBooking = async (req, res) => {
    try {
        const {
            movieTitle,
            customerName,
            customerEmail,
            dateTime,
            seats,
            totalPrice,
            poster,
            theaterName,
            hallName,
            screenId,
            showTime
        } = req.body;

        if (!seats || !Array.isArray(seats) || seats.length === 0) {
            return res.status(400).json({ message: 'No seats provided' });
        }
        if (!movieTitle || !customerName || !customerEmail || !dateTime || !totalPrice) {
            return res.status(400).json({ message: 'Missing required booking fields' });
        }

        const booking = new Booking({
            movieTitle,
            customerName,
            customerEmail,
            dateTime: new Date(dateTime),
            seats,
            totalPrice,
            poster,
            theaterName,
            hallName,
            screenId,
            showTime
        });

        if (req.user && req.user._id) {
            booking.user = req.user._id;
        }

        await booking.save();
        res.status(201).json(booking);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error creating booking' });
    }
};

exports.getBookings = async (req, res) => {
    try {
        const { email } = req.query;
        let query = {};

        if (req.user && req.user._id) {
            query.user = req.user._id;
        } else if (email) {
            query.customerEmail = email;
        }

        const bookings = await Booking.find(query).sort({ createdAt: -1 }).limit(100);
        res.json(bookings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching bookings' });
    }
};

exports.getMyBookings = async (req, res) => {
    try {
        if (!req.user || !req.user._id) return res.status(401).json({ message: 'Not authenticated' });
        const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching user bookings' });
    }
};

exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.json(booking);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching booking' });
    }
};

exports.cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        booking.status = 'Cancelled';
        await booking.save();
        res.json({ message: 'Booking cancelled', booking });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error cancelling booking' });
    }
};
