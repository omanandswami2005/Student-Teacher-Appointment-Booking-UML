const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/teachers', authMiddleware, adminController.addTeacher);
router.put('/teachers/:id', authMiddleware, adminController.updateTeacher);
router.delete('/teachers/:id', authMiddleware, adminController.deleteTeacher);
router.post('/approve/:id', authMiddleware, adminController.approveUser);

module.exports = router;
