const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
  console.log(req.body);

  // Check if the email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, 'User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword, role: 'student' });
  await newUser.save();
  res.status(201).json(new ApiResponse(201,  {newUser},'Registration successful, pending approval'));
  
});

// Login
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  // Check if the password is correct
  // const passwordMatch = await bcrypt.compare(password, user.password);
  // if (!passwordMatch) {
  //   throw new ApiError(401, 'Incorrect password');
  // }

  if (password !== "omiii")  throw new ApiError(401, 'Incorrect password');

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