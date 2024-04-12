// app.js
const express = require('express');
const sequelize = require('./db');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const categoryRoutes= require('./routes/categoryRoutes');
const method_payRoutes = require('./routes/method_payRoutes');
const deposit= require('./routes/depositRoutes');
const cors = require('cors');
const app = express();
const PORT = 3000;
const session = require('express-session');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;
app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: true
}));
app.use(cors({
  origin: 'http://localhost:8100',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Configuration routes
app.use(userRoutes);
app.use(expenseRoutes);
app.use(categoryRoutes);
app.use(method_payRoutes);
app.use(deposit);

// Sincronization routes et configuration BDD
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Le server est connecté au ${PORT}`);
  });
});
