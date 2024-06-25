const Appointment = require('../models/Appointment.model');
const Message = require('../models/Message.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');


// Schedule Appointment
exports.scheduleAppointment = asyncHandler(async (req, res) => {
  const { studentId, date, message } = req.body;
  if (!studentId) {
    throw new ApiError(400, 'Student ID is required');
  }
  if (!date) {
    throw new ApiError(400, 'Date is required');
  }
  if (!message) {
    throw new ApiError(400, 'Message is required');
  }
  const newAppointment = new Appointment({ student: studentId, teacher: req.user.userId, date, message });

  await newAppointment.save();
  res.status(201).json(new ApiResponse(201, { newAppointment }, 'Appointment scheduled successfully'));
});

// Approve/Cancel Appointment
exports.updateAppointmentStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updatedAppointment = await Appointment.findByIdAndUpdate(id, { status }, { new: true });
  res.status(200).json(new ApiResponse(200, { updatedAppointment }, 'Appointment updated successfully'));
});

// View Messages
exports.viewMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({ recipient: req.user.userId });
  res.status(200).json(new ApiResponse(200, { messages }, 'Messages found successfully'));
});

// View All Appointments
exports.viewAllAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({ teacher: req.user.userId }).populate('student');
  res.status(200).json(new ApiResponse(200, { appointments }, 'Appointments found successfully'));
});
