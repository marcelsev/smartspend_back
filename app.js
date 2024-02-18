// app.js
const express = require('express');
const sequelize = require('./db');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const categoryRoutes= require('./routes/categoryRoutes');
const method_payRoutes = require('./routes/method_payRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

// Configuración de rutas
app.use(userRoutes);
app.use(expenseRoutes);
app.use(categoryRoutes);
app.use(method_payRoutes);

// Sincronizar la base de datos y luego iniciar el servidor
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Le server est connecté au ${PORT}`);
  });
});
