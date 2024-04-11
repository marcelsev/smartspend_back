// controllers/UserController.js
const User = require('../models/user');
const bcrypt= require('bcrypt');

module.exports = {
  async createUser(req, res) {
    try {
      const { name, surname, email, password } = req.body;

    
      if (!name || !surname || !email || !password ) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }

      const existingUserEmail = await User.findOne({ where: { email } });
      if (existingUserEmail) {
        return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
      }

      
      const existingSurname = await User.findOne({ where: { surname } });
      if (existingSurname) {
        return res.status(400).json({ error: 'El pseudónimo ya está registrado' });
      }

      
      const hashedPassword = await bcrypt.hash(password, 10);

      
      const newUser = await User.create({ name, surname, email, password: hashedPassword });

      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },
  async checkUsernameUnique(req, res) {
    try {
      const { surname } = req.params;
      const existingUser = await User.findOne({ where: { surname } });
      res.json({ exists: !!existingUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error ');
    }
  },

  async getUserById(req, res) {
    try {
      const userId = req.user.userId; // ID del usuario autenticado extraído del token
      const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } });
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User non found' });
      }
      user.name = name;
      await user.save();
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error ');
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User non found' });
      }
      await user.destroy();
      res.json({ message: 'User deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error');
    }
  },
};
