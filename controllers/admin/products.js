const Product = require("../../models/product");
const { User } = require("../../models/index");

// Toodete loomine
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    // Dummy kasutaja leidmine
    const user = await User.findOne({ where: { email: "test@example.com" } });
    if (!user) return res.status(400).json({ error: "Kasutajat ei leitud" });

    const product = await Product.create({
      name,
      price,
      description,
      UserId: user.id // seos kasutajaga
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Toodet ei õnnestunud luua" });
  }
};

// Kõik tooted (admin)
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ include: User });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Viga toodete pärimisel" });
  }
};

// Konkreetne toode ID järgi
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, { include: User });
    if (!product) return res.status(404).json({ error: "Toodet ei leitud" });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Viga toote pärimisel" });
  }
};

// Toote uuendamine
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Toodet ei leitud" });

    if (req.query.edit === "true") {
      await product.update({ name, price, description });
      return res.json({ message: "Toode uuendatud", product });
    } else {
      return res.status(403).json({ error: "Uuendamine ei ole lubatud. Lisa aadressireale '?edit=true'" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Viga toote uuendamisel" });
  }
};

// Toote kustutamine
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Toodet ei leitud" });

    await product.destroy();
    res.json({ message: "Toode kustutatud" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Viga toote kustutamisel" });
  }
};
