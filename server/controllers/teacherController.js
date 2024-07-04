const Appointment = require('../models/Appointment.model');
const Message = require('../models/Message.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');


// Schedule Appointment
exports.scheduleAppointment = asyncHandler(async (req, res) => {
  const { student, date, message } = req.body;
  console.log(req.body);
  if (!student) {
    throw new ApiError(400, 'Student ID is required');
  }
  if (!date) {
    throw new ApiError(400, 'Date is required');
  }
  if (!message) {
    throw new ApiError(400, 'Message is required');
  }
  const newAppointment = new Appointment({ student: student, teacher: req.user.user._id, date, message });

  await newAppointment.save();
  res.status(201).json(new ApiResponse(201, { newAppointment }, 'Appointment scheduled successfully'));
});

// Approve/Cancel Appointment
exports.updateAppointmentStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log(id,);
  const status = req.body.data;

  if (!status) {
    throw new ApiError(400, 'Status is required');
  }

  
  const updatedAppointment = await Appointment.findByIdAndUpdate(id, { status }, { new: true });
  res.status(200).json(new ApiResponse(200, { updatedAppointment }, `Appointment marked as ${status} !!!`));
});

// View Messages
exports.viewMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({ recipient: req.user._id });
  res.status(200).json(new ApiResponse(200, { messages }, 'Messages found successfully'));
});

// View All Appointments
exports.viewAllAppointments = asyncHandler(async (req, res) => {
  console.log(req.user.user._id)
  const appointments = await Appointment.find({ teacher: req.user.user._id }).populate('student');

  console.log(appointments);

  res.status(200).json(new ApiResponse(200, { appointments }, 'Appointments found successfully'));
});
