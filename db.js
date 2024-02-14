// db.js
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('smartspend_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
