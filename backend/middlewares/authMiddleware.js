const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Admin = require('../models/adminModel');

const JWT_SECRET = process.env.JWT_SECRET;

exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) return res.status(401).json({ message: 'Not authorized, token missing' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = decoded.role === 'admin'
            ? await Admin.findById(decoded.id).select('-password')
            : await User.findById(decoded.id).select('-password');

        if (!user || user.isActive === false) {
            return res.status(401).json({ message: 'Account is deactivated or not found' });
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Not authorized, invalid token' });
    }
};

exports.authorize = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
    next();
};