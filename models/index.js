const sequelize = require('../config/database');
const User = require('./user');
const Product = require('./product');

let Cart, Order;
try {
  Cart = require('./cart');
} catch {}
try {
  Order = require('./order');
} catch {}

// Seosed, kui mudelid on olemas
if (Cart) {
  User.hasOne(Cart);
  Cart.belongsTo(User);

  Product.belongsToMany(Cart, { through: 'CartProducts' });
  Cart.belongsToMany(Product, { through: 'CartProducts' });
}

if (Order) {
  User.hasMany(Order);
  Order.belongsTo(User);

  Product.belongsToMany(Order, { through: 'OrderProducts' });
  Order.belongsToMany(Product, { through: 'OrderProducts' });
}

// User → Product (admin)
User.hasMany(Product);
Product.belongsTo(User);

module.exports = {
  sequelize,
  User,
  Product,
  Cart,
  Order
};
