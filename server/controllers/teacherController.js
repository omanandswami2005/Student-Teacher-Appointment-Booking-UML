/**
 * Controller for teacher API routes.
 */

const Appointment = require('../models/Appointment.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

/**
 * Schedule a new appointment for a teacher.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {ApiError} If the appointment quota has been reached.
 * @throws {ApiError} If the student ID, date, or message is missing.
 * @returns {Promise<Object>} The response data containing the created appointment.
 */
exports.scheduleAppointment = asyncHandler(async (req, res) => {
  const { student, date, message } = req.body;

  //limit the number of Appointments
  const appintments = await Appointment.countDocuments();
  if (appintments >= 20) {
    throw new ApiError(
      400,
      'Sorry, The Max Number of Appointments Quota has been reached :('
    );
  }

  if (!student) {
    throw new ApiError(400, 'Student ID is required');
  }
  if (!date) {
    throw new ApiError(400, 'Date is required');
  }
  if (!message) {
    throw new ApiError(400, 'Message is required');
  }
  const newAppointment = new Appointment({
    student: student,
    teacher: req.user.user._id,
    date,
    message,
    expireDate: new Date(),
  });

  await newAppointment.save();
  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { newAppointment },
        'Appointment scheduled successfully'
      )
    );
});

/**
 * Update the status of an appointment.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {ApiError} If the status is missing.
 * @returns {Promise<Object>} The response data containing the updated appointment.
 */
exports.updateAppointmentStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const status = req.body.data;

  if (!status) {
    throw new ApiError(400, 'Status is required');
  }

  const updatedAppointment = await Appointment.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { updatedAppointment },
        `Appointment marked as ${status} !!!`
      )
    );
});

/**
 * View all appointments for a teacher.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} The response data containing the list of appointments.
 */
exports.viewAllAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({
    teacher: req.user.user._id,
  }).populate('student');

  res
    .status(200)
    .json(
      new ApiResponse(200, { appointments }, 'Appointments found successfully')
    );
});
