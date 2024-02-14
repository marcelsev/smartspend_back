const express = require('express');
const router = express.Router();
const ExpenseController = require('../controllers/expensePostController');

// Define rutas para operaciones CRUD en usuarios
router.post('/expense', ExpenseController.createExpense);


module.exports = router;
