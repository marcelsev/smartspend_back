const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Category = require("../models/category");
const User= require("../models/user");
const Method_pay= require("../models/method_pay");


const Expense = sequelize.define("Expense", {
  amount: { type: DataTypes.FLOAT, allowNull: false },
  exp_date: { type: DataTypes.DATE, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  note: { type: DataTypes.STRING, allowNull: true },
});


Expense.belongsTo(Category);
Expense.belongsTo(User);
Expense.belongsTo(Method_pay);
module.exports = Expense;
