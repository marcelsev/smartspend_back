// app.js
const express = require('express');
const sequelize = require('./db');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const categoryRoutes= require('./routes/categoryRoutes');
const method_payRoutes = require('./routes/method_payRoutes');
const deposit= require('./routes/depositRoutes');
const cors = require('cors');
const csrf = require('csurf'); //  csurf
const cookieParser = require('cookie-parser'); 
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
  allowedHeaders: ['Content-Type', 'Authorization', 'X-XSRF-TOKEN'],  credentials: true
}));

app.use(express.json());
app.use(cookieParser()); 

//crsf token 
app.use(csrf({ cookie: true }));

app.get('/getCsrfToken', (req, res) => {
  const csrfToken = req.csrfToken(); 
  console.log('Token csrf:', csrfToken); 

  
  res.cookie('XSRF-TOKEN', csrfToken, { httpOnly: false, secure: false, sameSite: 'Lax' });
  res.status(200).json({ csrfToken }); 
});


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
