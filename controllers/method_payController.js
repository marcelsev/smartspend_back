const Method_pay = require("../models/method_pay");

module.exports = {
    async createMethod_pay(req, res) {
        try {
          const { name } = req.body;
          const newMethod_pay = await Method_pay.create({ name });
          res.json(newMethod_pay);
        } catch (error) {
          console.error(error);
          res.status(500).send('Error interno del servidor');
        }
      },
}