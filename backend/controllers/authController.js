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



const generateOtpCode = () => Math.floor(100000 + Math.random() * 900000).toString();

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
