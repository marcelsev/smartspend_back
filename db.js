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
  sequelize = new Sequelize({dialect: 'sqlite',
    storage: 'sequelize.sqlite',
  });
} else {
  sequelize = new Sequelize('smartspend_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
  });
}

module.exports = sequelize;