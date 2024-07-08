/**
 * Routes for student functionalities.
 * @module routes/studentRoutes
 * @requires express
 * @requires studentController
 * @requires authMiddleware
 */

const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * Route for searching all teachers in the system.
 * @name GET /student/teachers
 * @access Private
 * @returns {Array} teachers - Array of teacher objects.
 */
router.get('/teachers', authMiddleware, studentController.searchTeachers);

/**
 * Route for booking an appointment for a student.
 * @name POST /student/appointments
 * @access Private
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} response containing the newly created appointment.
 * @throws {ApiError} If the appointment quota has been reached or if required fields are missing.
 */
router.post('/appointments', authMiddleware, studentController.bookAppointment);

/**
 * Route for viewing all appointments of a student.
 * @name GET /student/appointments
 * @access Private
 * @returns {Array} appointments - Array of appointment objects.
 */
router.get(
  '/appointments',
  authMiddleware,
  studentController.viewAllAppointments
);

module.exports = router;

