// controllers/UserController.js
const User = require('../models/user');

module.exports = {
  async createUser(req, res) {
    try {
      const { name,surname,email, password } = req.body;
      const newUser = await User.create({ name, surname,email,password });
      res.json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      user.name = name;
      await user.save();
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      await user.destroy();
      res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },
};
