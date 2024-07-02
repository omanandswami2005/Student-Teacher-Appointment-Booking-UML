
const mongoose = require('mongoose');


const AppointmentSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: Date,
    message: String,
    status: { type: String, enum: ['Pending', 'Approved', 'Canceled', 'Completed'], default: 'Pending' }
  });
  
  module.exports = mongoose.model('Appointment', AppointmentSchema);
  