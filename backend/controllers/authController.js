const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const User = require('../models/userModel');
const Admin = require('../models/adminModel');
const OTP = require('../models/otpModel');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
if (!EMAIL_USER || !EMAIL_PASS) {
    throw new Error('Missing email credentials: EMAIL_USER and EMAIL_PASS must be set in the environment');
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    }
});

const loadTemplate = (fileName, replacements) => {
    let html = fs.readFileSync(path.join(__dirname, '../templates', fileName), 'utf8');
    Object.keys(replacements).forEach(key => {
        html = html.replace(new RegExp(`{{${key}}}`, 'g'), replacements[key]);
    });
    return html;
};

const getModelByRole = (role) => {
    return role === 'admin' ? Admin : User;
};

const getUserByEmail = async (email) => {
    const normalizedEmail = email.toLowerCase();
    return (await Admin.findOne({ email: normalizedEmail })) || (await User.findOne({ email: normalizedEmail }));
};

const generateOtpCode = () => Math.floor(100000 + Math.random() * 900000).toString();

const issueAuthCookieAndRedirect = (res, user) => {
    const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.cookie('token', token, {
        httpOnly: false,
        sameSite: 'lax',
        secure: false,
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.redirect(`${FRONTEND_URL}/`);
};

exports.requestOtp = async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;
    if (!email || !password || !firstName || !lastName || !role)
        return res.status(400).json({ message: 'All fields required' });

    const Model = getModelByRole(role);
    const existing = await Model.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(409).json({ message: `${role} email already exists` });

    const otpCode = generateOtpCode();
    const hashedPassword = await bcrypt.hash(password, 10);

    await OTP.findOneAndUpdate(
        { email: email.toLowerCase() },
        {
            email: email.toLowerCase(),
            otp: otpCode,
            tempPassword: hashedPassword,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
            role,
            firstName,
            lastName,
        },
        { upsert: true, returnDocument: 'after' }
    );

    const html = loadTemplate('signupOtp.html', { firstName, otpCode });
    await transporter.sendMail({ from: `CineBook <${process.env.EMAIL_USER}>`, to: email, subject: 'CineBook Signup OTP', html });

    res.status(200).json({ message: 'OTP sent', email });
};

exports.verifyOtpAndSignup = async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: 'Email and OTP are required' });

    const otpRecord = await OTP.findOne({ email: email.toLowerCase(), otp });
    if (!otpRecord || otpRecord.expiresAt < new Date()) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const Model = getModelByRole(otpRecord.role);
    const existing = await Model.findOne({ email: email.toLowerCase() });
    if (existing) {
        await OTP.deleteOne({ email: email.toLowerCase() });
        return res.status(409).json({ message: `${otpRecord.role} email already exists` });
    }

    const newUser = new Model({
        email: email.toLowerCase(),
        password: otpRecord.tempPassword,
        firstName: otpRecord.firstName,
        lastName: otpRecord.lastName,
        role: otpRecord.role,
        phone: "",
        preferences: {
            theme: "dark",
            notifications: true,
        }
    });

    await newUser.save();
    await OTP.deleteOne({ email: email.toLowerCase() });

    res.status(201).json({ message: 'Signup successful', user: { email: newUser.email, role: newUser.role, firstName: newUser.firstName, lastName: newUser.lastName, phone: newUser.phone, profilePicture: newUser.profilePicture, createdAt: newUser.createdAt } });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

    const user = await getUserByEmail(email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.status(200).json({ token, user: { email: user.email, role: user.role, firstName: user.firstName, lastName: user.lastName, phone: user.phone, profilePicture: user.profilePicture, createdAt: user.createdAt } });
};

exports.requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const user = await getUserByEmail(email);
    if (!user) return res.status(404).json({ message: 'No account found with that email' });

    const otpCode = generateOtpCode();
    await OTP.findOneAndUpdate(
        { email: email.toLowerCase() },
        {
            email: email.toLowerCase(),
            otp: otpCode,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
        },
        { upsert: true, returnDocument: 'after' }
    );

    const html = loadTemplate('passwordResetOtp.html', { firstName: user.firstName || 'User', otpCode });
    await transporter.sendMail({ from: `CineBook <${process.env.EMAIL_USER}>`, to: email, subject: 'CineBook Password Reset OTP', html });

    res.status(200).json({ message: 'Password reset OTP sent', email });
};

exports.verifyPasswordResetOtp = async (req, res) => {
    const { email, otp, password } = req.body;
    if (!email || !otp || !password) return res.status(400).json({ message: 'Email, OTP and new password are required' });

    const otpRecord = await OTP.findOne({ email: email.toLowerCase(), otp });
    if (!otpRecord || otpRecord.expiresAt < new Date()) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const Model = getModelByRole(otpRecord.role);
    const user = await Model.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: 'Account not found' });

    user.password = await bcrypt.hash(password, 10);
    await user.save();
    await OTP.deleteOne({ email: email.toLowerCase() });

    res.status(200).json({ message: 'Password reset successful' });
};

exports.getCurrentUser = async (req, res) => {
    try {
        const user = req.user;
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                profilePicture: user.profilePicture,
                preferences: user.preferences,
                createdAt: user.createdAt,
            },
        });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user', error: err.message });
    }
};


// Update user personal information and preferences
exports.updateUserInfo = async (req, res) => {
    try {
        const { firstName, lastName, phone, preferences } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { firstName, lastName, phone, preferences },
            { returnDocument: 'after', runValidators: true }
        );
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                profilePicture: user.profilePicture,
                preferences: user.preferences,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.uploadProfilePicture = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const profilePicture = `/uploads/users/${req.file.filename}`;
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { profilePicture },
            { returnDocument: 'after' }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Profile picture uploaded successfully",
            profilePicture,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                profilePicture: user.profilePicture,
                preferences: user.preferences,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.googleCallback = async (req, res) => {
    if (!req.user) {
        return res.redirect(`${FRONTEND_URL}/login`);
    }

    return issueAuthCookieAndRedirect(res, req.user);
};