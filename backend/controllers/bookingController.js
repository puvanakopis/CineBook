const Booking = require('../models/bookingModel');
const User = require('../models/userModel');

exports.createBooking = async (req, res) => {
    try {
        const {
            movieId,
            movieTitle,
            customerName,
            customerEmail,
            dateTime,
            seats,
            totalPrice,
            payment,
            poster,
            theaterId,
            theaterName,
            screenId,
            showTime,
            genres,
            duration,
            format
        } = req.body;

        if (!seats || !Array.isArray(seats) || seats.length === 0) {
            return res.status(400).json({ message: 'No seats provided' });
        }
        if (!movieTitle || !customerName || !customerEmail || !dateTime || !totalPrice) {
            return res.status(400).json({ message: 'Missing required booking fields' });
        }

        const booking = new Booking({
            movieId,
            movieTitle,
            customerName,
            customerEmail,
            dateTime: new Date(dateTime),
            seats,
            totalPrice,
            payment,
            poster,
            theaterId,
            theaterName,
            screenId,
            showTime,
            genres,
            duration,
            format
        });

        if (req.user && req.user._id) {
            booking.user = req.user._id;
        }

        // Set status based on payment if provided
        if (booking.payment && booking.payment.status) {
            booking.status = booking.payment.status === 'Paid' ? 'Confirmed' : 'Pending';
        }

        await booking.save();
        res.status(201).json({ message: 'Booking created', booking });
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
        
        // Search by user ID OR customerEmail (to catch legacy bookings or ones created without session)
        const bookings = await Booking.find({ 
            $or: [
                { user: req.user._id },
                { customerEmail: req.user.email }
            ]
        }).sort({ createdAt: -1 });
        
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
        
        // Ownership check
        if (booking.user && booking.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to cancel this booking' });
        }

        booking.status = 'Cancelled';
        await booking.save();
        res.json({ message: 'Booking cancelled successfully', booking });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error cancelling booking' });
    }
};

// Update payment info for a booking
exports.updatePayment = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        const { payment } = req.body;
        if (!payment) return res.status(400).json({ message: 'Payment data required' });

        booking.payment = payment;
        // Update booking status based on payment
        booking.status = payment.status === 'Paid' ? 'Confirmed' : booking.status;

        await booking.save();
        res.json({ message: 'Payment updated', booking });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error updating payment' });
    }
};

exports.getBookedSeats = async (req, res) => {
    try {
        const { movieId, theaterId, screenId, date, showTime } = req.query;

        let query = {
            status: { $ne: 'Cancelled' }
        };

        if (movieId) query.movieId = movieId;
        if (theaterId) query.theaterId = theaterId;
        if (screenId) query.screenId = screenId;
        if (showTime) query.showTime = showTime;

        if (date) {
            const startDate = new Date(date);
            if (!isNaN(startDate.getTime())) {
                startDate.setHours(0, 0, 0, 0);
                const endDate = new Date(date);
                endDate.setHours(23, 59, 59, 999);
                query.dateTime = { $gte: startDate, $lte: endDate };
            }
        }

        const bookings = await Booking.find(query);
        const bookedSeats = bookings.reduce((acc, booking) => {
            if (booking.seats) {
                booking.seats.forEach(seat => acc.push(seat.id));
            }
            return acc;
        }, []);

        res.json(bookedSeats);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching booked seats' });
    }
};

