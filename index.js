const express = require("express");
const sequelize = require("./config/database");
const { User, Cart } = require("./models/index");
const adminRoutes = require("./routes/admin");
const cartRoutes = require("./routes/cart");
const app = express();
const PORT = 3035;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Dummy kasutaja kontroll ja tabelite loomine
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Ühendus andmebaasiga on loodud!");

    // Force true = kustutab olemasolevad tabelid ja loob uuesti
    await sequelize.sync({ force: true });
    console.log("✅ Mudelid sünkroniseeritud ja tabelid loodud!");

    // Dummy kasutaja loomine
    const dummyUser = await User.create({
      name: "Test Kasutaja",
      email: "test@example.com"
    });

    // Dummy kasutaja kaardi loomine
    const dummyCart = await dummyUser.createCart();
    console.log("✅ Dummy kasutaja ja kaart loodud:", dummyCart.toJSON());

    // Serveri käivitamine
    app.listen(PORT, () => {
      console.log(`🚀 Server töötab: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Viga andmebaasi ühendamisel või tabelite loomisel:", error);
  }
})();

// Lihtne test
app.get("/", (req, res) => {
  res.json({ message: "Web_shop töötab!" });
});

// Admin routes
app.use("/admin", adminRoutes);

// Cart routes
app.use("/cart", cartRoutes);
