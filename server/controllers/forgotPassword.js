// forgotPassword.js
const crypto = require('crypto');
const User = require('../models/User.model');
const asyncHandler = require('../utils/asyncHandler');

const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const sendVerificationEmail = require('../utils/nodemailer');
// const { config } = require('dotenv').config();
const axios = require('axios');

const verifyCaptcha = async (token) => {
  const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET}&response=${token}`);
  return response.data.success;
};


// Forgot Password
exports.forgotPassword = asyncHandler(async (req, res, next) => {
    // console.log(req.body)
    const { email, captchaToken } = req.body;

    const isCaptchaValid = await verifyCaptcha(captchaToken);
    if (!isCaptchaValid) {
      throw new ApiError(400, 'Invalid CAPTCHA');
    }

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, 'User not found 🥲');
  }
//Check if user is verified
  if (!user.isVerified) {
    throw new ApiError(400, 'Please verify your email first');
  }

  if(user.resetPasswordToken && Date.now() < user.resetPasswordExpiry) {
    throw new ApiError(400, 'Please wait for 5 minutes before resetting your password again');
  }
  // Generate a reset token and set expiry time (e.g., 5 minutes)
  const resetToken = crypto.randomBytes(32).toString('hex');

 const expiryTime = Date.now() + 5 * 60 * 1000; // 3 minutes in milliseconds


  user.resetPasswordToken = resetToken;
  user.resetPasswordExpiry = expiryTime;
  await user.save();

  // Send reset password email
   sendVerificationEmail(email, resetToken,true);

  res.status(200).json(new ApiResponse(200, null, 'Password reset link sent to your email and it is valid for 5 minutes'));
});
