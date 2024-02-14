const Expense = require("../models/expense");

module.exports = {
    async createExpense (req, res) {
        try {
          const { amount, exp_date, location, note } = req.body;
          const newExpense = await Expense.create({ amount, exp_date, location, note});
          res.json(newExpense);
        } catch (error) {
          console.error(error);
          res.status(500).send('Error interno del servidor');
        }
      },
}