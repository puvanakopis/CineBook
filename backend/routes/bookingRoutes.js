const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', bookingController.createBooking);
router.get('/', bookingController.getBookings);

module.exports = router;
