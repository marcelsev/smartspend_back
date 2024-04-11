const express = require('express');
const router = express.Router();
const DepositController = require('../controllers/depositController');

// CRUD routes
router.post('/deposit', DepositController.createDeposit);
router.get('/deposit', DepositController.getDeposits);
router.get('/deposit/:id', DepositController.getDepositById);
router.put('/deposit/:id', DepositController.updateDeposit);
router.delete('/deposit/:id', DepositController.deleteDeposit);
module.exports = router;


module.exports = router;
