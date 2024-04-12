const Category = require("../models/category");

module.exports = {
    async createCategory(req, res) {
        try {
          const { name } = req.body;
          const newCategory = await Category.create({ name });
          res.json(newCategory);
        } catch (error) {
          console.error(error);
          res.status(500).send('Error ');
        }
      },
      async getCategories(req, res) {
        try {
            const categories = await Category.findAll();
            res.json(categories);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error ');
        }
    },
    
    async getCategoryById(req, res) {
        try {
            const { id } = req.params;
            const category = await Category.findByPk(id);
    
            if (!category) {
                return res.status(404).json({ error: 'Category non found' });
            }
    
            res.json(category);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error');
        }
    },
    
    async updateCategory(req, res) {
      try {
          const { id } = req.params;
          const { name } = req.body;
          
          const category = await Category.findByPk(id);
          if (!category) {
              return res.status(404).json({ error: 'Category non found' });
          }
          
          await category.update({ name });
          res.json(category);
      } catch (error) {
          console.error(error);
          res.status(500).send('Error ');
      }
  },async deleteCategory(req, res) {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({ error: 'Category non found' });
        }

        await category.destroy();
        res.json({ message: 'Category deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error ');
    }
}

  
    
}