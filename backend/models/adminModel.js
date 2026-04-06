const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    _id: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ['admin'], 
        default: 'admin' 
    },
    isActive: { 
        type: Boolean, 
        default: true 
    },
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Admin', adminSchema);