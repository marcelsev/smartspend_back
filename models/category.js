const { DataTypes } = require("sequelize");
const sequelize = require("../db");
//const Expense = require("../models/expense");


const Category = sequelize.define("Category", {
    name:{type: DataTypes.STRING, allowNull:false},
});

module.exports = Category;