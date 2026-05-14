const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('../config/passport');
const { protect } = require('../middlewares/authMiddleware');
const { uploadImage } = require('../middlewares/uploadMiddleware');

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

// Get & Update Current User
router.get('/me', protect, authController.getCurrentUser);
router.put('/me', protect, authController.updateUserInfo);
router.post('/upload-dp', protect, uploadImage('users').single('profilePicture'), authController.uploadProfilePicture);

// Payment Methods
router.post('/payment-methods', protect, authController.addPaymentMethod);
router.get('/payment-methods', protect, authController.getPaymentMethods);
router.put('/payment-methods/:id', protect, authController.updatePaymentMethod);
router.delete('/payment-methods/:id', protect, authController.deletePaymentMethod);

// Security
router.put('/update-password', protect, authController.updatePassword);
router.post('/deactivate-account', protect, authController.deactivateAccount);

module.exports = router;