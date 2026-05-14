const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Public endpoint to process payment and create booking
router.post('/', paymentController.processPayment);

// Optional Stripe PaymentIntent creation (requires STRIPE_SECRET_KEY in env and stripe package)
router.post('/intent', paymentController.createStripeIntent);

module.exports = router;
