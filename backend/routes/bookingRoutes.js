const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', bookingController.createBooking);
router.get('/', bookingController.getBookings);
router.get('/me', protect, bookingController.getMyBookings);
router.get('/:id', bookingController.getBookingById);
router.post('/:id/cancel', protect, bookingController.cancelBooking);

module.exports = router;
