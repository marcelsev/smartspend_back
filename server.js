// server.js
const app = require('./app');
const sequelize = require('./db');

const PORT = 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Le server est connecté au ${PORT}`);
  });
});
