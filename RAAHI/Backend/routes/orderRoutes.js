const express = require("express");
const router = express.Router();
const isloggedIn = require("../middlewares/isLoggedIn");
const {
  placeOrder,
  allOrders,
  order,
} = require("../controllers/orderControllers");

router.post("/order/place", isloggedIn, placeOrder);
router.get("/orders", isloggedIn, allOrders);
router.get("/order/:orderId", isloggedIn, order);

module.exports = router;
