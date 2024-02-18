const Deposit = require("../models/deposit");

const User = require("../models/user");



module.exports = {
    async createDeposit (req, res) {
        try {
          const { amount, dep_date,  note,  userId,  } = req.body;
          
          const user = await User.findByPk(userId);
         
         
          if ( !user ) {
            return res.status(404).json({ error: 'La categoría no existe' });
          }
          const newDeposit = await Deposit.create({ amount, dep_date, note,  UserId: user.id});
          res.json(newDeposit);
        } catch (error) {
          console.error(error);
          res.status(500).send('Error interno del servidor');
        }
      },
}