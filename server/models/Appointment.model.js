/**
 * Represents an appointment between a student and a teacher.
 *
 * @property {ObjectId} student - The ID of the student
 * @property {ObjectId} teacher - The ID of the teacher
 * @property {Date} date - The date of the appointment
 * @property {Date} expireAt - The date when the appointment expires
 * @property {String} message - A message for the appointment
 * @property {String} status - The status of the appointment
 * @property {String[]} status.enum - The possible values of the status field
 * @property {String} status.default - The default value of the status field
 *
 * @mongooseModel Appointment
 */

const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  expireAt: { type: Date, expires: `2d`, default: Date.now() },
  message: String,
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Canceled', 'Completed'],
    default: 'Pending',
  },
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
