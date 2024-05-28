// jest.setup.js
const sequelize = require('./db');
const  User  = require('./models/user');  // Assurez-vous que c'est le bon chemin vers vos modèles
const bcrypt = require('bcrypt');

beforeAll(async () => {
  await sequelize.sync({ force: true });

  // Ajouter des données de test
  const hashedPassword = await bcrypt.hash('password123', 10);
  await User.bulkCreate([
    { name: 'John', surname: 'Doe', email: 'john@example.com', password: hashedPassword },
    { name: 'Jane', surname: 'Doe', email: 'jane@example.com', password: hashedPassword },
    { name: 'Bob', surname: 'Smith', email: 'bob@example.com', password: hashedPassword },
  ]);
});

afterAll(async () => {
  await sequelize.close();
});