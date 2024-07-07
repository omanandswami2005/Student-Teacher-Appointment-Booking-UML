const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/teachers', authMiddleware, studentController.searchTeachers);
router.post('/appointments', authMiddleware, studentController.bookAppointment);
router.get(
  '/appointments',
  authMiddleware,
  studentController.viewAllAppointments
);

module.exports = router;
