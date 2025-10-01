const express = require("express");
const { Sequelize } = require("sequelize");

const app = express();
const PORT = 3035;

// Sequelize ühendus
const sequelize = new Sequelize("web_shop_sequelize", "root", "qwerty", {
  host: "localhost",
  dialect: "mysql",
});


// Testime ühendust
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Ühendus andmebaasiga on loodud!");
  } catch (error) {
    console.error("❌ Andmebaasi ühendus ebaõnnestus:", error);
  }
})();

// Lihtne test-route
app.get("/", (req, res) => {
  res.json({ message: "Web_shop töötab!" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server töötab: http://localhost:${PORT}`);
});
