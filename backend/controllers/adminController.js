const User = require('../models/userModel');
const Admin = require('../models/adminModel');
const Booking = require('../models/bookingModel');
const bcrypt = require('bcryptjs');

// Fetch all users and admins with their booking counts
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').lean();
        const admins = await Admin.find().select('-password').lean();

        // Get booking counts for regular users
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
                // Map roles for frontend consistency if needed, but we'll do it in frontend
            };
        }));

        // Admins/Managers usually don't have bookings in this context, but we can set to 0
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

// Toggle user/admin active status
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

// Update user role (only for Admin model users: admin <-> manager)
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

// Create a new user or admin/manager
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

// Delete a user or admin/manager
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

        // Also delete their bookings? Maybe just keep them for records but unlinked or handled by status.
        // For now, just delete the user.

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error deleting user', error: error.message });
    }
};
