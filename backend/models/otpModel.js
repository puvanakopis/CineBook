const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String
    },
    tempPassword: {
        type: String
    },
    expiresAt: {
        type: Date
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
}, { timestamps: true });

module.exports = mongoose.model('OTP', otpSchema);