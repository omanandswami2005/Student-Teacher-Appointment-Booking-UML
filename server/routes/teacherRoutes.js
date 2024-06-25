const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/appointments', authMiddleware, teacherController.scheduleAppointment);
router.post('/appointments/:id/approve', authMiddleware, teacherController.updateAppointmentStatus);
router.post('/appointments/:id/cancel', authMiddleware, teacherController.updateAppointmentStatus);
router.get('/messages', authMiddleware, teacherController.viewMessages);
router.get('/appointments', authMiddleware, teacherController.viewAllAppointments);

module.exports = router;
