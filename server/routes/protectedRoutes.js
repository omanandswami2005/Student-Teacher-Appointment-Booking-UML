/**
 * This module defines the routes for the protected API endpoints.
 * @module routes/protectedRoutes
 * @requires express
 * @requires middlewares/authMiddleware
 * @requires middlewares/authorizeRoles
 * @requires routes/studentRoutes
 * @requires routes/teacherRoutes
 * @requires routes/adminRoutes
 * @requires routes/commonRoutes
 */

const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/authorizeRoles');
const studentRoutes = require('./studentRoutes');
const teacherRoutes = require('./teacherRoutes');
const adminRoutes = require('./adminRoutes');
const commonRoutes = require('./commonRoutes');

/**
 * Express Router instance for the protected routes.
 * @type {express.Router}
 */
const router = express.Router();

/**
 * Route for student-related endpoints.
 * Requires authentication and authorization for students.
 * @name /student
 * @memberof module:routes/protectedRoutes
 */
router.use(
  '/student',
  authMiddleware,
  authorizeRoles('student'),
  studentRoutes
);

/**
 * Route for teacher-related endpoints.
 * Requires authentication and authorization for teachers.
 * @name /teacher
 * @memberof module:routes/protectedRoutes
 */
router.use(
  '/teacher',
  authMiddleware,
  authorizeRoles('teacher'),
  teacherRoutes
);

/**
 * Route for admin-related endpoints.
 * Requires authentication and authorization for admins.
 * @name /admin
 * @memberof module:routes/protectedRoutes
 */
router.use('/admin', authMiddleware, authorizeRoles('admin'), adminRoutes);

/**
 * Route for common endpoints.
 * Requires authentication for all roles.
 * @name /common
 * @memberof module:routes/protectedRoutes
 */
router.use('/common', authMiddleware, commonRoutes);

module.exports = router;
