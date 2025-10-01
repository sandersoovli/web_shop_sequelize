const sequelize = require("../config/database");
const User = require("./user");
const Product = require("./product");
const Cart = require("./cart");
const CartItem = require("./cart-item");
const Order = require("./order");
const OrderItem = require("./order-item");

// User ↔ Cart
User.hasOne(Cart);
Cart.belongsTo(User);

// Cart ↔ Product (CartItem kaudu)
Product.belongsToMany(Cart, { through: CartItem });
Cart.belongsToMany(Product, { through: CartItem });

// User ↔ Order
User.hasMany(Order);
Order.belongsTo(User);

// Order ↔ Product (OrderItem kaudu)
Product.belongsToMany(Order, { through: OrderItem });
Order.belongsToMany(Product, { through: OrderItem });

// User ↔ Product (admin seos)
User.hasMany(Product);
Product.belongsTo(User);

module.exports = {
  sequelize,
  User,
  Product,
  Cart,
  CartItem,
  Order,
  OrderItem,
};
