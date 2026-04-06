const mongoose = require('mongoose');
const Counter = require('./counterModel');

const adminSchema = new mongoose.Schema({
    _id: {
        type: String
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
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

adminSchema.pre('save', async function () {
    if (this.isNew && !this._id) {
        const counter = await Counter.findByIdAndUpdate(
            'admin',
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        this._id = `admin_${String(counter.seq).padStart(2, '0')}`;
    }
});

module.exports = mongoose.model('Admin', adminSchema);