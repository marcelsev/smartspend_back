const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Method_pay = sequelize.define("Method_pay", {
    name:{type: DataTypes.STRING, allowNull:false},
});

module.exports = Method_pay;