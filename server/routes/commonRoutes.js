const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/getcounts',adminController.getAllCounts);


router.get('/students',  adminController.viewAllStudents);

router.get('/teachers',  adminController.viewAllTeachers);

router.get('/')


module.exports = router;