const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/getcounts',adminController.getAllCounts);

module.exports = router;