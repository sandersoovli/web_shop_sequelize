const express = require("express");
const sequelize = require("./config/database"); // impordi ühendus
const adminRoutes = require("./routes/admin");

const app = express();
const PORT = 3035;

// JSON body parser
app.use(express.json());

// Testime ühendust ja sünkroniseerime mudelid
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Ühendus andmebaasiga on loodud!");
    await sequelize.sync(); // loob tabelid, kui neid pole
    console.log("✅ Mudelid sünkroniseeritud!");
  } catch (error) {
    console.error("❌ Viga andmebaasi ühendamisel või sünkroniseerimisel:", error);
  }
})();

// Lihtne test-route
app.get("/", (req, res) => {
  res.json({ message: "Web_shop töötab!" });
});

// Admin route
app.use("/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server töötab: http://localhost:${PORT}`);
});
