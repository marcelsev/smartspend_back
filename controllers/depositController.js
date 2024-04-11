const Deposit = require("../models/deposit");

const User = require("../models/user");



module.exports = {
    async createDeposit (req, res) {
        try {
          const { amount, dep_date,  note,  userId,  } = req.body;
          
          const user = await User.findByPk(userId);
         
         
          if ( !user ) {
            return res.status(404).json({ error: 'not found' });
          }
          const newDeposit = await Deposit.create({ amount, dep_date, note,  UserId: user.id});
          res.json(newDeposit);
        } catch (error) {
          console.error(error);
          res.status(500).send('Error r');
        }
      },

      async getDeposits(req, res) {
        try {
            const deposits = await Deposit.findAll();
            res.json(deposits);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error ');
        }
    },
    
    async getDepositById(req, res) {
        try {
            const { id } = req.params;
            const deposit = await Deposit.findByPk(id);
    
            if (!deposit) {
                return res.status(404).json({ error: 'Deposit non found' });
            }
    
            res.json(deposit);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error');
        }
    },
    async updateDeposit(req, res) {
      try {
          const { id } = req.params;
          const { amount, dep_date, note, userId } = req.body;
          
          const user = await User.findByPk(userId);
          
          if (!user) {
              return res.status(404).json({ error: 'User non found' });
          }
          
          const deposit = await Deposit.findByPk(id);
          if (!deposit) {
              return res.status(404).json({ error: 'Deposit non found' });
          }
          
          await deposit.update({ amount, dep_date, note, UserId: user.id });
          res.json(deposit);
      } catch (error) {
          console.error(error);
          res.status(500).send('Error');
      }
  },
  
  async deleteDeposit(req, res) {
    try {
        const { id } = req.params;
        const deposit = await Deposit.findByPk(id);

        if (!deposit) {
            return res.status(404).json({ error: 'Deposit non found' });
        }

        await deposit.destroy();
        res.json({ message: 'Deposit deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error ');
    }
}

    
}