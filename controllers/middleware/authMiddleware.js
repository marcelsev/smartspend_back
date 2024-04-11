// authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
exports.authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(401).json({ message: 'Token de autenticación requerido' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId; 
      next(); 
    } catch (error) {
      console.error('Error al verificar el token:', error);
  
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Token de autenticación inválido' });
      } else if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expirado' });
      } else {
        return res.status(500).json({ message: 'Error interno del servidor' });
      }
    }
  };
  
