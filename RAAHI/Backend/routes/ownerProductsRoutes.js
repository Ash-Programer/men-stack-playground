const express = require("express");
const upload = require("../config/multer-config");
const {
  ownerProducts,
  createProduct,
  editProduct,
} = require("../controllers/ownerProductsController");
const isOwner = require("../middlewares/isOwnerLoggedIn");
const router = express.Router();

router.get("/products", isOwner, ownerProducts);
router.post("/createProduct", upload.single("image"), isOwner, createProduct);
router.put("/product/:productId", isOwner, editProduct);
module.exports = router;
