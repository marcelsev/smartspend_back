const Expense = require("../models/expense");
const Category = require("../models/category");
const User = require("../models/user");
const Method_pay=require("../models/method_pay");


module.exports = {
    async createExpense (req, res) {
        try {
          const { amount, exp_date, location, note, categoryId, userId, methodPayId } = req.body;
          const category = await Category.findByPk(categoryId);
          const user = await User.findByPk(userId);
          const method_pay = await Method_pay.findByPk(methodPayId);
          console.log(category)
          if (!category || !user || !method_pay) {
            return res.status(404).json({ error: 'La categoría no existe' });
          }
          const newExpense = await Expense.create({ amount, exp_date, location, note, CategoryId: category.id, UserId: user.id, MethodPayId: method_pay.id});
          res.json(newExpense);
        } catch (error) {
          console.error(error);
          res.status(500).send('Error interno del servidor');
        }
      },
}