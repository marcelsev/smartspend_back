const Category = require("../models/category");

module.exports = {
    async createCategory(req, res) {
        try {
          const { name } = req.body;
          const newCategory = await Category.create({ name });
          res.json(newCategory);
        } catch (error) {
          console.error(error);
          res.status(500).send('Error interno del servidor');
        }
      },
}