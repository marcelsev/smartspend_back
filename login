const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = {
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      // Buscar el usuario por email
      const user = await User.findOne({ where: { email } });

      // Si el usuario no existe, devolver un error
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Verificar la contraseña
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
      }

      // Si la contraseña es válida, iniciar sesión correctamente
      res.json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },

  // Otros métodos de autenticación aquí...
};
