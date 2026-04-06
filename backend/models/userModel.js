const mongoose = require('mongoose');
const Counter = require('./counterModel');

const userSchema = new mongoose.Schema({
    _id:
    {
        type: String
    },
    firstName:
    {
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
        enum: ['user'],
        default: 'user'
    },
    isActive: {
        type: Boolean,
        default: true
    },
}, {

    timestamps: true
});

userSchema.pre('save', async function () {
    if (this.isNew && !this._id) {
        const counter = await Counter.findByIdAndUpdate(
            'user',
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        this._id = `user_${String(counter.seq).padStart(2, '0')}`;
    }
});

module.exports = mongoose.model('User', userSchema);