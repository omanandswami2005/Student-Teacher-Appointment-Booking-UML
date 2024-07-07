const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/appointments', authMiddleware, teacherController.scheduleAppointment);
router.put('/appointments/:id', authMiddleware, teacherController.updateAppointmentStatus);
router.post('/appointments/:id/cancel', authMiddleware, teacherController.updateAppointmentStatus);
router.get('/appointments',  teacherController.viewAllAppointments);

module.exports = router;
