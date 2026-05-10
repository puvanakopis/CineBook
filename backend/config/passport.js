const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const bcrypt = require('bcryptjs');

const User = require('../models/userModel');
const Admin = require('../models/adminModel');

const getUserByEmail = async (email) => {
    const normalizedEmail = email.toLowerCase();
    return (await Admin.findOne({ email: normalizedEmail })) || (await User.findOne({ email: normalizedEmail }));
};

const createGoogleUser = async (profile) => {
    const email = profile.emails?.[0]?.value?.toLowerCase();
    if (!email) {
        throw new Error('Google account does not have a verified email address');
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return existingUser;
    }

    const firstName = profile.name?.givenName || profile.displayName?.split(' ')[0] || 'Google';
    const lastName = profile.name?.familyName || profile.displayName?.split(' ').slice(1).join(' ') || 'User';
    const randomPassword = await bcrypt.hash(`${profile.id}-${Date.now()}`, 10);

    const newUser = new User({
        firstName,
        lastName,
        email,
        password: randomPassword,
        role: 'user',
    });

    await newUser.save();
    return newUser;
};

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.BACKEND_URL || 'http://localhost:4000'}/api/auth/google/callback`,
        },
        async (_accessToken, _refreshToken, profile, done) => {
            try {
                const user = await createGoogleUser(profile);
                done(null, user);
            } catch (error) {
                done(error, null);
            }
        }
    )
);

module.exports = passport;