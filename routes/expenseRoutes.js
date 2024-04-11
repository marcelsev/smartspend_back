const express = require('express');
const router = express.Router();
const ExpenseController = require('../controllers/expensePostController');

// CRUD routes
router.post('/expense', ExpenseController.createExpense);
router.get('/expense', ExpenseController.getExpenses);
router.get('/expense/:id', ExpenseController.getExpenseById);
router.put('/expense/:id', ExpenseController.updateExpense);
router.delete('/expense/:id', ExpenseController.deleteExpense);
module.exports = router;
