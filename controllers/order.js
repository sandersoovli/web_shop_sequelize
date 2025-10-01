const { User, Cart, CartItem, Order, OrderItem, Product } = require("../models");

exports.createOrder = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: "test@example.com" },
      include: Cart
    });
    if (!user) return res.status(400).json({ error: "Kasutajat ei leitud" });

    const cart = await user.getCart({
      include: Product
    });

    const products = cart.Products; // Sequelize lisab relatsioonid suure algustähega
    if (!products || products.length === 0) {
      return res.status(400).json({ error: "Kaart on tühi" });
    }

    // Loo tellimus
    const order = await user.createOrder();

    // Lisa tooted tellimusele
    for (const product of products) {
      const cartItem = await CartItem.findOne({
        where: { CartId: cart.id, ProductId: product.id }
      });
      await order.addProduct(product, {
        through: { quantity: cartItem.quantity }
      });
    }

    // Puhasta kaart (rakenduses)
    await cart.setProducts([]);

    res.json({ message: "Tellimus vormistatud", orderId: order.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Viga tellimuse loomisel" });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: "test@example.com" }
    });
    if (!user) return res.status(400).json({ error: "Kasutajat ei leitud" });

    const orders = await Order.findAll({
      where: { UserId: user.id },
      include: Product
    });

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Viga tellimuste pärimisel" });
  }
};
