const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User= require("./user");



const Deposit = sequelize.define("Deposit", {
  amount: { type: DataTypes.FLOAT, allowNull: false },
  dep_date: { type: DataTypes.DATE, allowNull: false },
  note: { type: DataTypes.STRING, allowNull: true },
});



Deposit.belongsTo(User);

module.exports = Deposit;
