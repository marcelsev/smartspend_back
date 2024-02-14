const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Expense = sequelize.define("Expense", {
  amount: { type: DataTypes.FLOAT, allowNull: false },
  exp_date: { type: DataTypes.DATE, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  note: { type: DataTypes.STRING, allowNull: true },
});
module.exports = Expense;
