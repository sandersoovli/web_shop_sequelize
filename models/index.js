const sequelize = require('../config/database');
const User = require('./user');
const Product = require('./product');
const Cart = require('./cart');
const CartItem = require('./cart-item');
// Kui sul on Order mudel olemas, saab hiljem lisada
// const Order = require('./order');

// Seosed

// User → Cart (1:1)
User.hasOne(Cart);
Cart.belongsTo(User);

// Cart → Product (N:M) läbi CartItem
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

// User → Product (1:N) admini lisamiseks
User.hasMany(Product);
Product.belongsTo(User);

// Order seosed saab lisada hiljem
/*
if (Order) {
  User.hasMany(Order);
  Order.belongsTo(User);

  Product.belongsToMany(Order, { through: 'OrderProducts' });
  Order.belongsToMany(Product, { through: 'OrderProducts' });
}
*/

module.exports = {
  sequelize,
  User,
  Product,
  Cart,
  CartItem
  // Order
};
