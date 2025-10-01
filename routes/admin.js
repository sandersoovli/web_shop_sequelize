const express = require("express");
const router = express.Router();
const productController = require("../controllers/admin/products");

// POST /admin/products → lisa uus toode
router.post("/products", productController.createProduct);

// GET /admin/products → pärib kõik tooted (admin)
router.get("/products", productController.getProducts);

// GET /admin/products/:id → pärib konkreetse toote ID järgi (admin ja tavakasutaja)
router.get("/products/:id", productController.getProductById);

// PUT /admin/products/:id → uuendab konkreetset toodet ID järgi (admin)
router.put("/products/:id", productController.updateProduct);

// DELETE /admin/products/:id → kustutab konkreetse toote ID järgi (admin)
router.delete("/products/:id", productController.deleteProduct);

module.exports = router;
