const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('../config/passport');
const { protect } = require('../middlewares/authMiddleware');

// Signup & OTP
router.post('/signup/request-otp', authController.requestOtp);
router.post('/signup/verify-otp', authController.verifyOtpAndSignup);

// Login
router.post('/login', authController.login);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));
router.get(
	'/google/callback',
	passport.authenticate('google', { failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/login`, session: false }),
	authController.googleCallback
);

// Password Reset
router.post('/forgot-password/request-otp', authController.requestPasswordReset);
router.post('/forgot-password/verify-otp', authController.verifyPasswordResetOtp);

// Get Current User
router.get('/me', protect, authController.getCurrentUser);

module.exports = router;