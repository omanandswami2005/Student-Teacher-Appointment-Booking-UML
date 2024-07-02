const User = require('../models/User.model');
const Appointment = require('../models/Appointment.model');
const Message = require('../models/Message.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');




// Search Teacher
exports.searchTeachers = asyncHandler(async (req, res) => {
  const teachers = await User.find({ role: 'teacher', approved: true });
  res.status(200).json(new ApiResponse(200, { teachers }, 'Teachers found successfully'));
});

// Book Appointment
exports.bookAppointment = asyncHandler(async (req, res) => {
  const { teacherId, date, message } = req.body;
  const newAppointment = new Appointment({ student: req.user.userId, teacher: teacherId, date, message });
  await newAppointment.save();
  res.status(201).json(new ApiResponse(201, { newAppointment }, 'Appointment booked successfully'));
});

// Send Message
exports.sendMessage = asyncHandler(async (req, res) => {
  const { recipientId, content } = req.body;
  const newMessage = new Message({ sender: req.user.userId, recipient: recipientId, content });
  await newMessage.save();
  res.status(201).json(new ApiResponse(201, { newMessage }, 'Message sent successfully'));
});
