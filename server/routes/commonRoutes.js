const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/getcounts',adminController.getAllCounts);


router.get('/students',  adminController.viewAllStudents);


module.exports = router;