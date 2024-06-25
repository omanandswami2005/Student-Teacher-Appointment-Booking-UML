const User = require('../models/User.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiError  = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');


// Add Teacher
exports.addTeacher = asyncHandler(async (req, res) => {
  const { name, email, password, department, subject } = req.body;
  const newUser = new User({ name, email, password, department, subject, role: 'teacher' });
  await newUser.save();

  res.status(201).json(new ApiResponse(201, {newUser}, 'Teacher added successfully'));
});

// Update Teacher
exports.updateTeacher = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, department, subject } = req.body;
  const updatedTeacher = await User.findByIdAndUpdate(id, { name, department, subject }, { new: true });
  res.status(200).json(new ApiResponse(200, {updatedTeacher}, 'Teacher updated successfully'));
});

// Delete Teacher
exports.deleteTeacher = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.status(200).json(new ApiResponse(200, null, 'Teacher deleted successfully'));
});

// Approve Registration
exports.approveUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedUser = await User.findByIdAndUpdate(id, { approved: true }, { new: true });
  res.status(200).json(new ApiResponse(200, {updatedUser}, 'User approved successfully'));
});
