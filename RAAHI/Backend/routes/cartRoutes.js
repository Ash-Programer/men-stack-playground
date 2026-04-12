const express = require("express");
const isloggedIn = require("../middlewares/isLoggedIn");
const {
  addProduct,
  removeProduct,
  decreseQuantity,
  increaseQuantity,
  getAllCartProducts,
} = require("../controllers/userCartController");
const router = express.Router();
router.get("/cart/allproducts", isloggedIn, getAllCartProducts);
router.post("/cart/add", isloggedIn, addProduct);
router.delete("/cart/remove", isloggedIn, removeProduct);
router.put("/cart/decrease/:productId", isloggedIn, decreseQuantity);
router.put("/cart/increase/:productId", isloggedIn, increaseQuantity);

module.exports = router;
