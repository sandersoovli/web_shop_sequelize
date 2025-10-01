const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Order = require("./order");
const Product = require("./product");

const OrderItem = sequelize.define("OrderItem", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  OrderId: {
    type: DataTypes.INTEGER,
    references: {
      model: Order,
      key: "id"
    },
    onDelete: "CASCADE",
    allowNull: false
  },
  ProductId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: "id"
    },
    onDelete: "CASCADE",
    allowNull: false
  }
}, {
  tableName: "order_items",
  timestamps: true
});

module.exports = OrderItem;
