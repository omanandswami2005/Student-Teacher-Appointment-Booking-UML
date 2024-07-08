/**
 * Module containing student controller functions.
 * @module controllers/studentController
 */

const User = require('../models/User.model');
const Appointment = require('../models/Appointment.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const config = require('../config/config');

/**
 * Searches for all teachers in the system.
 * @route GET /api/students/search-teachers
 * @access Public
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} response containing an array of teachers.
 * @throws {ApiError} If an error occurs while searching for teachers.
 */
exports.searchTeachers = asyncHandler(async (req, res) => {
  const teachers = await User.find({ role: 'teacher' });
  res
    .status(200)
    .json(new ApiResponse(200, { teachers }, 'Teachers found successfully'));
});

/**
 * Books an appointment for a student.
 * @route POST /api/students/book-appointment
 * @access Private
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} response containing the newly created appointment.
 * @throws {ApiError} If the appointment quota has been reached or if required fields are missing.
 */
exports.bookAppointment = asyncHandler(async (req, res) => {
  const { teacher, date, message } = req.body;

  // Limit the number of appointments
  const appointments = await Appointment.countDocuments();
  if (appointments >= 20) {
    throw new ApiError(
      400,
      'Sorry, The Max Number of Appointments Quota has been reached :('
    );
  }

  // Validate required fields
  if (!teacher) {
    throw new ApiError(400, 'Please select a teacher');
  }
  if (!date) {
    throw new ApiError(400, 'Date is required');
  }
  const dateMain = new Date(date);

  // Check if date is in the past
  if (dateMain < new Date()) {
    throw new ApiError(400, 'Date cannot be in the past');
  }

  // Check if date is more than 1 month in the future
  if (dateMain > new Date(new Date().setMonth(new Date().getMonth() + 1))) {
    throw new ApiError(400, 'Date cannot be more than 1 month in the future');
  }

  if (!message) {
    throw new ApiError(400, 'Please enter a message');
  }

  const newAppointment = new Appointment({
    student: req.user.user._id,
    teacher: teacher,
    date,
    message,
  });

  await newAppointment.save();
  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { newAppointment },
        'Appointment booked successfully'
      )
    );
});

/**
 * Views all appointments for a student.
 * @route GET /api/students/view-appointments
 * @access Private
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} response containing an array of appointments.
 * @throws {ApiError} If an error occurs while fetching appointments.
 */
exports.viewAllAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({
    student: req.user.user._id,
  }).populate('teacher');
  res
    .status(200)
    .json(
      new ApiResponse(200, { appointments }, 'Appointments found successfully')
    );
});

