const express = require('express');
const  authMiddleware  = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/authorizeRoles');
const studentRoutes = require('./studentRoutes');
const teacherRoutes = require('./teacherRoutes');
const adminRoutes = require('./adminRoutes');
const commonRoutes = require('./commonRoutes');

const router = express.Router();

router.use('/student', authMiddleware, authorizeRoles('student'), studentRoutes);
router.use('/teacher', authMiddleware, authorizeRoles('teacher'), teacherRoutes);

router.use('/admin', authMiddleware, authorizeRoles('admin'), adminRoutes);
router.use('/common', authMiddleware, commonRoutes);

module.exports = router;
