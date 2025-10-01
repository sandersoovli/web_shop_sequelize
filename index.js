const express = require("express");
const sequelize = require("./config/database");
const { User } = require("./models/index");
const adminRoutes = require("./routes/admin");

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
    console.log("✅ Dummy kasutaja loodud:", dummyUser.toJSON());

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
