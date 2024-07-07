const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/teacher', authMiddleware, adminController.addTeacher);
router.put('/teacher/:id', authMiddleware, adminController.updateTeacher);
router.delete('/teacher/:id', authMiddleware, adminController.deleteTeacher);
router.put('/approve/:id', authMiddleware, adminController.approveStudent);

router.delete('/student/:id', authMiddleware, adminController.deleteStudent);


router.get('/appointments', authMiddleware, adminController.viewAllAppointments);

router.get('/teachers', authMiddleware, adminController.viewAllTeachers);

router.get('/getmonthlydata',  adminController.getMonthlyData);




module.exports = router;
