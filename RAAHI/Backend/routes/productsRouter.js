const express = require("express");
const router = express.Router();
// const isloggedIn = require("../middlewares/isOwnerLoggedIn");

const { getAllProducts } = require("../controllers/productController");

router.get("/", (req, res) => {
  res.send("Hello, I am in products");
});

// router.post("/create", upload.single("image"), isloggedIn, createProduct);
router.get("/allproducts", getAllProducts);
module.exports = router;
