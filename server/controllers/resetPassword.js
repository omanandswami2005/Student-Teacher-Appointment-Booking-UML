// resetPassword.js
const bcrypt = require('bcrypt');
const User = require('../models/User.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

// Reset Password
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { token, newPassword } = req.body;

  //   console.log(token, newPassword);

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
