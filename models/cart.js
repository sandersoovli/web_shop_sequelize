const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Cart = sequelize.define("Cart", {
  // Hetkel ei ole täiendavaid välju
}, {
  tableName: "carts",
  timestamps: true
});

module.exports = Cart;
