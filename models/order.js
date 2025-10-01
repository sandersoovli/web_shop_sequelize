const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Order = sequelize.define("Order", {
  // Hetkel ei ole täiendavaid välju
}, {
  tableName: "orders",
  timestamps: true
});

module.exports = Order;
