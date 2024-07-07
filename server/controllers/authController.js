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

//check auth
exports.checkAuth = asyncHandler(async (req, res) => {
  logger.info(req.user);
 
  res.status(200).json(new ApiResponse(200, {  ...req.user }, 'Authentication successful'));

});

// Register
exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;


 //limit the number of students
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
    verificationTokenExpiry: expiryTime
  });

  // Save the new user
  await newUser.save();

  // Send verification email asynchronously
  sendVerificationEmail(email, token).catch(err => console.error('Error sending email:', err));

  res.status(201).json(new ApiResponse(201, { newUser }, 'Registration successful! Please verify your email'));
});


// Login
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

  // if (password !== "omiii" )  throw new ApiError(401, 'Incorrect password');



  const token = jwt.sign({ user: user }, process.env.JWT_SECRET, { expiresIn: '1h' });
// logger.info(JSON.stringify(user.role));
  const redirectUrl = user.role;
  res
  .cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 1000 * 60 * 30 })// 30 min
  .status(200).json(new ApiResponse(200,  {redirectUrl, name:user.name} , 'Login successful'));
});

// Logout
exports.logout = asyncHandler(async (req, res) => {

    res.cookie('token', null, { expires: new Date(Date.now()) });
    res.clearCookie('token');
    res.status(200).json(new ApiResponse(200,  null , 'Logout successful'));
});


//isLoggedIn
exports.isLoggedIn = asyncHandler(async (req, res) => {

    res.status(200).json(new ApiResponse(200,  null , 'User is logged in'));
})



// Verify Email
// router.get('/verify-email', );


exports.verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.query;
  // console.log(token);

  const user = await User.findOne({ verificationToken: token });

  

  // console.log(user);
  if (!user) {
    throw new ApiError(404, 'User not found 🥲');
  }
if (user.isVerified) {
    return res.status(200).json(new ApiResponse(200, null, 'Email already verified 😁'));
  }
  // Check if the token has expired
  if (Date.now() > user.verificationTokenExpiry) {
    throw new ApiError(400, 'Verification token has expired  😓');
  }

  user.isVerified = true;
  // user.verificationToken = undefined; // Clear the verification token
  user.verificationTokenExpiry = undefined; // Clear the expiry time
  await user.save();

  res.status(200).json(new ApiResponse(200, null, 'Email verified successfully 😃'));
});
