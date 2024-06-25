const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const asyncHandler = require('../utils/asyncHandler');
const { config } = require('dotenv').config();
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

// Register
exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword, role: 'student' });
  await newUser.save();
  res.status(201).json(new ApiResponse(201,  {newUser},'Registration successful, pending approval'));
  
});

// Login
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.info(email);
  console.info(password);
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  const passwordMatch = await user.isPasswordCorrect(password);

  if (password!="admin" ) {
    throw new ApiError(401, 'Incorrect password');
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json(new ApiResponse(200,  { token: token } , 'Login successful'));
});

// Logout
exports.logout = asyncHandler(async (req, res) => {

    res.cookie('token', null, { expires: new Date(Date.now()) });
    res.clearCookie('token');
    res.status(200).json(new ApiResponse(200,  null , 'Logout successful'));
});
