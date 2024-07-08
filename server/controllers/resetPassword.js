const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendVerificationEmail = require('../utils/nodemailer');
const crypto = require('crypto');
const asyncHandler = require('../utils/asyncHandler');
const { config } = require('dotenv').config();
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');



/**
 * Reset the password of a user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @throws {ApiError} If the token is invalid or expired.
 * @return {Promise} A promise that resolves when the password is reset.
 */
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { token, newPassword } = req.body;

  // Find user by token and check if token is expired
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, 'Invalid or expired token 😓');
  }

  // Hash new password and save
  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiry = undefined;
  await user.save();

  res
    .status(200)
    .json(new ApiResponse(200, null, 'Password reset successful 🎉'));
});

