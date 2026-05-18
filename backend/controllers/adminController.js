const User = require('../models/userModel');
const Admin = require('../models/adminModel');
const Booking = require('../models/bookingModel');
const Movie = require('../models/movieModel');
const Theater = require('../models/theaterModel');
const bcrypt = require('bcryptjs');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').lean();
        const admins = await Admin.find().select('-password').lean();

        const usersWithStats = await Promise.all(users.map(async (user) => {
            const bookingCount = await Booking.countDocuments({ 
                $or: [
                    { user: user._id },
                    { customerEmail: user.email }
                ]
            });
            return {
                ...user,
                totalBookings: bookingCount,
            };
        }));

        const adminsWithStats = admins.map(admin => ({
            ...admin,
            totalBookings: 0
        }));

        const allUsers = [...adminsWithStats, ...usersWithStats];

        res.status(200).json(allUsers);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error fetching users', error: error.message });
    }
};

exports.toggleUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;

        let user = await User.findById(id);
        let isUser = true;

        if (!user) {
            user = await Admin.findById(id);
            isUser = false;
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.isActive = isActive;
        await user.save();

        res.status(200).json({ message: `User ${isActive ? 'activated' : 'suspended'} successfully`, user });
    } catch (error) {
        res.status(500).json({ message: 'Server error updating status', error: error.message });
    }
};

exports.updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        if (!['admin', 'manager'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin/Manager not found' });
        }

        admin.role = role;
        await admin.save();

        res.status(200).json({ message: 'Role updated successfully', user: admin });
    } catch (error) {
        res.status(500).json({ message: 'Server error updating role', error: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;
        
        if (!firstName || !lastName || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const isSpecialRole = ['admin', 'manager'].includes(role);
        const Model = isSpecialRole ? Admin : User;

        const existing = await Model.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(409).json({ message: 'User with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Model({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: hashedPassword,
            role,
            isActive: true
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error creating user', error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        let user = await User.findByIdAndDelete(id);
        if (!user) {
            user = await Admin.findByIdAndDelete(id);
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error deleting user', error: error.message });
    }
};

exports.getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalBookings = await Booking.countDocuments();
        const totalMovies = await Movie.countDocuments({ isNowShowing: true });
        
        const revenueResult = await Booking.aggregate([
            { $match: { 'payment.status': 'Paid' } },
            { $group: { _id: null, total: { $sum: '$totalPrice' } } }
        ]);
        const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

        const last6Months = [];
        for (let i = 5; i >= 0; i--) {
            const d = new Date();
            d.setMonth(d.getMonth() - i);
            last6Months.push({
                month: d.toLocaleString('default', { month: 'short' }),
                year: d.getFullYear(),
                monthIndex: d.getMonth()
            });
        }

        const monthlyRevenue = await Promise.all(last6Months.map(async (m) => {
            const start = new Date(m.year, m.monthIndex, 1);
            const end = new Date(m.year, m.monthIndex + 1, 0, 23, 59, 59);
            const result = await Booking.aggregate([
                { $match: { 
                    'payment.status': 'Paid',
                    createdAt: { $gte: start, $lte: end }
                } },
                { $group: { _id: null, total: { $sum: '$totalPrice' } } }
            ]);
            return {
                name: m.month,
                revenue: result.length > 0 ? result[0].total : 0
            };
        }));

        const genreStats = await Booking.aggregate([
            { $unwind: '$genres' },
            { $group: { _id: '$genres', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);
        const topGenres = genreStats.map(g => ({
            name: g._id,
            value: g.count
        }));

        const recentBookings = await Booking.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .lean();

        res.status(200).json({
            stats: {
                totalRevenue,
                totalBookings,
                totalUsers,
                activeMovies: totalMovies
            },
            monthlyRevenue,
            topGenres,
            recentBookings
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ message: 'Server error fetching dashboard stats', error: error.message });
    }
};
