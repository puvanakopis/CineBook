const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Signup & OTP
router.post('/signup/request-otp', authController.requestOtp);
router.post('/signup/verify-otp', authController.verifyOtpAndSignup);

// Login
router.post('/login', authController.login);

module.exports = router;