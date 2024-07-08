const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendVerificationEmail = require('../utils/nodemailer');
const crypto = require('crypto');

const asyncHandler = require('../utils/asyncHandler');
const { config } = require('dotenv').config();
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const logger = require('../utils/logger');

/**
 * Check if the user is authenticated.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.checkAuth = asyncHandler(async (req, res) => {
  logger.info(req.user);

  res
    .status(200)
    .json(new ApiResponse(200, { ...req.user }, 'Authentication successful'));
});

/**
 * Register a new user (student) in the system.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @throws {ApiError} If the student quota has been reached.
 */
exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Limit the number of students
  const students = await User.countDocuments({ role: 'student' });
  if (students >= 20) {
    throw new ApiError(400, 'Sorry, The Student Quota has been reached :(');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Generate a verification token and set expiry time (e.g., 1 hour)
  const token = crypto.randomBytes(32).toString('hex');
  const expiryTime = Date.now() + 3600000; // 1 hour in milliseconds

  // Create the new user object
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role: 'student',
    isVerified: false,
    verificationToken: token,
    verificationTokenExpiry: expiryTime,
  });

  // Save the new user
  await newUser.save();

  // Send verification email asynchronously
  sendVerificationEmail(email, token).catch((err) =>
    console.error('Error sending email:', err)
  );

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { newUser },
        'Registration successful! Please verify your email'
      )
    );
});

/**
 * Log in an existing user.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @throws {ApiError} If the user is not found, the password is incorrect, the email is not verified, or the user is not approved.
 */
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, 'User not found ❌');
  }

  // Check if the password is correct
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new ApiError(404, 'Incorrect password ❌');
  }

  if (user.role === 'student' && !user.isVerified) {
    throw new ApiError(404, 'Please verify your email first 📧');
  }

  if (!user.approved) {
    throw new ApiError(404, 'Please wait for admin approval 😅');
  }

  const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
    expiresIn: '2h',
  });
  const redirectUrl = user.role;
  res
    .cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 2,
    }) // 2 hours
    .status(200)
    .json(
      new ApiResponse(200, { redirectUrl, name: user.name }, 'Login successful')
    );
});

/**
 * Log out the current user.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.logout = asyncHandler(async (req, res) => {
  res.cookie('token', null, { expires: new Date(Date.now()) });
  res.clearCookie('token');
  res.status(200).json(new ApiResponse(200, null, 'Logout successful'));
});

/**
 * Check if the user is logged in.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.isLoggedIn = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, null, 'User is logged in'));
});

/**
 * Verify a user's email using a verification token.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @throws {ApiError} If the user is not found or the verification token has expired.
 */
exports.verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.query;

  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    throw new ApiError(404, 'User not found 🥲');
  }
  if (user.isVerified) {
    return res
      .status(200)
      .json(new ApiResponse(200, null, 'Email already verified 😁'));
  }
  // Check if the token has expired
  if (Date.now() > user.verificationTokenExpiry) {
    throw new ApiError(400, 'Verification token has expired  😓');
  }

  user.isVerified = true;
  user.verificationTokenExpiry = undefined; // Clear the expiry time
  await user.save();

  res
    .status(200)
    .json(new ApiResponse(200, null, 'Email verified successfully 😃'));
});
