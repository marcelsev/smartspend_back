const express = require('express');
const router = express.Router();
const DepositController = require('../controllers/depositController');

// Define rutas para operaciones CRUD en usuarios
router.post('/deposit', DepositController.createDeposit);


module.exports = router;
