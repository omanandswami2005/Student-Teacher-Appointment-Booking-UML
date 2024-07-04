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
  const teachers = await User.find({ role: 'teacher' });
  res.status(200).json(new ApiResponse(200, { teachers }, 'Teachers found successfully'));
});


// Book Appointment
exports.bookAppointment = asyncHandler(async (req, res) => {
  const { teacher, date, message } = req.body;
// console.log(teacher,req.user.userId,date,message)

if (!teacher) {
  throw new ApiError(400, 'Please select a teacher');
}
if (!date) {
  throw new ApiError(400, 'Date is required');
}

const dateMain = new Date(date);

if (dateMain < new Date()) {
  throw new ApiError(400, 'Date cannot be in the past');
}

//for only futher 1 month
if (dateMain > new Date(new Date().setMonth(new Date().getMonth() + 1))) {
  throw new ApiError(400, 'Date cannot be more than 1 month in the future');
}

if (!message) {
  throw new ApiError(400, 'Please enter a message');
}

  const newAppointment = new Appointment({ student: req.user.user._id, teacher: teacher, date, message });




  await newAppointment.save();
  res.status(201).json(new ApiResponse(201, { newAppointment }, 'Appointment booked successfully'));
});

// View All Appointments
exports.viewAllAppointments = asyncHandler(async (req, res) => {
console.log(req.user.user._id)

  const appointments = await Appointment.find({ student: req.user.user._id }).populate('teacher');
  // console.log(appointments);
  res.status(200).json(new ApiResponse(200, { appointments }, 'Appointments found successfully'));
});


