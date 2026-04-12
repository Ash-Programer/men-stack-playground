// router.post("/cart/add",
const userModel = require("../models/user-model");
const productModel = require("../models/product-model");
const addProduct = async (req, res) => {
  try {
    const userId = req.userId; // from auth middleware
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).send("Product ID is required");
    }

    // Check if product exists
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }

    const user = await userModel.findById(userId);

    // Check if product already in cart
    const existingItem = user.cart.find(
      (item) => item.product.toString() === productId,
    );

    if (existingItem) {
      // Increase quantity
      existingItem.quantity += 1;
    } else {
      // Add new product
      user.cart.push({
        product: productId,
        quantity: 1,
      });
    }

    await user.save();

    res.send({
      message: "Product added to cart",
      cart: user.cart,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const removeProduct = async (req, res) => {
  try {
    const userId = req.userId; // from JWT middleware
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).send("Product ID is required");
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if product exists in cart
    const exists = user.cart.some(
      (item) => item.product.toString() === productId,
    );

    if (!exists) {
      return res.status(404).send("Product not in cart");
    }

    // Remove product
    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productId,
    );

    await user.save();

    res.send({
      message: "Product removed from cart",
      cart: user.cart,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// increasing the count of a product which is present in cart
const increaseQuantity = async (req, res) => {
  try {
    const userId = req.userId; // from JWT
    const { productId } = req.params;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    const item = user.cart.find(
      (item) => item.product.toString() === productId,
    );

    if (!item) {
      return res.status(404).send("Product not in cart");
    }

    item.quantity += 1;

    await user.save();

    res.send({
      message: "Quantity increased",
      cart: user.cart,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const decreseQuantity = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;

    const user = await userModel.findById(userId);

    const item = user.cart.find(
      (item) => item.product.toString() === productId,
    );

    if (!item) return res.send("Product not in cart");

    item.quantity -= 1;

    // Remove if quantity becomes 0
    user.cart = user.cart.filter((item) => item.quantity > 0);

    await user.save();

    res.send(user.cart);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getAllCartProducts = async (req, res) => {
  try {
    const userId = req.userId; // from JWT middleware

    const user = await userModel.findById(userId).populate("cart.product"); // 🔥 important

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send({
      cart: user.cart,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports = {
  addProduct,
  removeProduct,
  increaseQuantity,
  decreseQuantity,
  getAllCartProducts,
};
