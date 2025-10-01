const Product = require("../../models/product");

// Toodete loomine
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const product = await Product.create({ name, price, description });
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Toodet ei õnnestunud luua" });
  }
};

// Kõikide toodete pärimine (admin)
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Viga toodete pärimisel" });
  }
};

// Konkreetse toote pärimine ID järgi (admin ja tavakasutaja)
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Toodet ei leitud" });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Viga toote pärimisel" });
  }
};

// Konkreetse toote uuendamine ID järgi (admin)
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

// Konkreetse toote kustutamine ID järgi (admin)
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
