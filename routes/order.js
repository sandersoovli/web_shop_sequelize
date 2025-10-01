const experss = require("express");
const router = experss.Router();
const orderController = require("../controllers/order");

//post /order/create -> vormista tellimus
router.post("/create", orderController.createOrder);

//get /order -> kuva kasutaja tellimused
router.get("/", orderController.getOrders);

module.exports = router;