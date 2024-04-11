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
            return res.status(404).json({ error: ' n existe pas' });
          }
          const newExpense = await Expense.create({ amount, exp_date, location, note, CategoryId: category.id, UserId: user.id, MethodPayId: method_pay.id});
          res.json(newExpense);
        } catch (error) {
          console.error(error);
          res.status(500).send('Error server');
        }
      },


      async getExpenses(req, res) {
        try {
            const expenses = await Expense.findAll();
            res.json(expenses);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error server');
        }
    },
    
    async  getExpenseById(req, res) {
      try {
          const { id } = req.params;
  
          const expense = await Expense.findByPk(id);
  
          if (!expense) {
              return res.status(404).json({ error: 'n existe pas' });
          }
  
          res.json(expense);
      } catch (error) {
          console.error(error);
          res.status(500).send('Error server');
      }
  },

    async updateExpense(req, res) {
      try {
          const { id } = req.params;
          const { amount, exp_date, location, note, categoryId, userId, methodPayId } = req.body;
          
          const category = await Category.findByPk(categoryId);
          const user = await User.findByPk(userId);
          const method_pay = await Method_pay.findByPk(methodPayId);
  
          
  
          if (!category || !user || !method_pay) {
              return res.status(404).json({ error: 'n existe pas' });
          }
  
          const expense = await Expense.findByPk(id);
          if (!expense) {
              return res.status(404).json({ error: 'la depense n existe' });
          }
  
          await expense.update({ amount, exp_date, location, note, CategoryId: category.id, UserId: user.id, MethodPayId: method_pay.id });
          res.json(expense);
      } catch (error) {
          console.error(error);
          res.status(500).send('Error server');
      }
  },

  async deleteExpense(req, res) {
    try {
        const { id } = req.params;
        const expense = await Expense.findByPk(id);

        if (!expense) {
            return res.status(404).json({ error: 'n existe pas' });
        }

        await expense.destroy();
        res.json({ message: 'depense supprimée' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error ');
    }
},

  
}

