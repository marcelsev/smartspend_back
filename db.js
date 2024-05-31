// db.js
/* const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('smartspend_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
 */

// db.js
const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development';
let sequelize;

if (env === 'test') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'sequelize.sqlite',
  });
} else {
  const dbName = process.env.DB_NAME || 'smartspend_db';
  const dbUser = process.env.DB_USER || 'root';
  const dbPass = process.env.DB_PASS || '';
  const dbHost = process.env.DB_HOST || 'localhost';

  sequelize = new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    dialect: 'mysql',
  });
}

module.exports = sequelize;
