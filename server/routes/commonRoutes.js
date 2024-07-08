/**
 * Module for common routes.
 * @module routes/commonRoutes
 */

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

/**
 * Get counts of all students and teachers.
 * @name GET /getcounts
 * @function
 * @memberof module:routes/commonRoutes
 * @inner
 * @returns {Object} counts - Object containing student and teacher counts.
 * @property {number} counts.studentCount - Number of students.
 * @property {number} counts.teacherCount - Number of teachers.
 */
router.get('/getcounts', adminController.getAllCounts);

/**
 * Get all students.
 * @name GET /students
 * @function
 * @memberof module:routes/commonRoutes
 * @inner
 * @returns {Array} students - Array of student objects.
 */
router.get('/students', adminController.viewAllStudents);

/**
 * Get all teachers.
 * @name GET /teachers
 * @function
 * @memberof module:routes/commonRoutes
 * @inner
 * @returns {Array} teachers - Array of teacher objects.
 */
router.get('/teachers', adminController.viewAllTeachers);

/**
 * Default route.
 * @name GET /
 * @function
 * @memberof module:routes/commonRoutes
 * @inner
 * @returns {string} message - Default message.
 */
router.get('/', (req, res) => res.send('Default route'));

module.exports = router;

