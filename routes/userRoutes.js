// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const LoginUser = require('../controllers/loginUser');
const {authenticate} = require('../controllers/middleware/authMiddleware');

// CRUD routes
router.post('/users', UserController.createUser);
router.get('/users', UserController.getAllUsers);
router.get('/users/:id', authenticate,UserController.getUserById);
router.put('/users/:id', authenticate, UserController.updateUser);
router.delete('/users/:id', authenticate, UserController.deleteUser);


router.get('/users/check-surname/:surname', UserController.checkUsernameUnique);
router.post('/login', LoginUser.loginUser);
router.post('/logout', authenticate, LoginUser.logout);

module.exports = router;
