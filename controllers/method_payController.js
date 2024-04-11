const Method_pay = require("../models/method_pay");

module.exports = {
    async createMethod_pay(req, res) {
        try {
          const { name } = req.body;
          const newMethod_pay = await Method_pay.create({ name });
          res.json(newMethod_pay);
        } catch (error) {
          console.error(error);
          res.status(500).send('Error ');
        }
      },

      async getMethod_pays(req, res) {
        try {
            const method_pays = await Method_pay.findAll();
            res.json(method_pays);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error ');
        }
    },
    
    async getMethod_payById(req, res) {
        try {
            const { id } = req.params;
            const method_pay = await Method_pay.findByPk(id);
    
            if (!method_pay) {
                return res.status(404).json({ error: 'non found' });
            }
    
            res.json(method_pay);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error ');
        }
    },

    async updateMethod_pay(req, res) {
      try {
          const { id } = req.params;
          const { name } = req.body;
          
          const method_pay = await Method_pay.findByPk(id);
          if (!method_pay) {
              return res.status(404).json({ error: 'non found' });
          }
          
          await method_pay.update({ name });
          res.json(method_pay);
      } catch (error) {
          console.error(error);
          res.status(500).send('Error ');
      }
  },

  async deleteMethod_pay(req, res) {
    try {
        const { id } = req.params;
        const method_pay = await Method_pay.findByPk(id);

        if (!method_pay) {
            return res.status(404).json({ error: 'non found' });
        }

        await method_pay.destroy();
        res.json({ message: 'Method pay deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error ');
    }
}

  
    
}