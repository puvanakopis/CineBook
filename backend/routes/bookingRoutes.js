const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', bookingController.createBooking);
router.get('/', protect, bookingController.getBookings);
router.get('/me', protect, bookingController.getMyBookings);
router.get('/booked-seats', bookingController.getBookedSeats);
router.get('/:id', bookingController.getBookingById);
router.post('/:id/cancel', protect, bookingController.cancelBooking);
router.post('/:id/payment', protect, bookingController.updatePayment);

module.exports = router;
