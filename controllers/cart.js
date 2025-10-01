const { Cart, CartItem, Product, User } = require("../models");

exports.addToCart = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: "test@example.com" }, include: Cart });
    if (!user) return res.status(400).json({ error: "Kasutajat ei leitud" });

    const cart = await user.getCart();

    const product = await Product.findByPk(req.body.productId);
    if (!product) return res.status(404).json({ error: "Toodet ei leitud" });

    const [item, created] = await cart.addProduct(product, { through: { quantity: 1 } });

    // Kui toode juba olemas, suurendame koguse
    if (!created) {
      const cartItem = await CartItem.findOne({ where: { CartId: cart.id, ProductId: product.id } });
      cartItem.quantity += 1;
      await cartItem.save();
    }

    res.json({ message: "Toode lisatud kaardile" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Viga kaardile lisamisel" });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: "test@example.com" }, include: Cart });
    if (!user) return res.status(400).json({ error: "Kasutajat ei leitud" });

    const cart = await user.getCart();
    const product = await Product.findByPk(req.body.productId);
    if (!product) return res.status(404).json({ error: "Toodet ei leitud" });

    await cart.removeProduct(product);

    res.json({ message: "Toode eemaldatud kaardist" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Viga kaardist eemaldamisel" });
  }
};
