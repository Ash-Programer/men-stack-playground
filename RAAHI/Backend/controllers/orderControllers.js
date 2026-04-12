const userModel = require("../models/user-model");
const orderModel = require("../models/order-model");

const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await userModel.findById(userId).populate("cart.product");

    if (!user || user.cart.length === 0) {
      return res.status(400).send("Cart is empty");
    }

    let totalAmount = 0;

    const items = user.cart.map((item) => {
      const priceAfterDiscount =
        item.product.price - (item.product.price * item.product.discount) / 100;

      totalAmount += priceAfterDiscount * item.quantity;

      return {
        product: item.product._id,
        quantity: item.quantity,
      };
    });

    const order = await orderModel.create({
      user: userId,
      items,
      totalAmount,
    });

    // Save order reference in user
    user.orders.push(order._id);

    // Clear cart
    user.cart = [];

    await user.save();

    res.send({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const allOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await orderModel
      .find({ user: userId })
      .populate("items.product");

    res.send(orders);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const order = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await orderModel.findById(orderId).populate("items.product");

    if (!order) {
      return res.status(404).send("Order not found");
    }

    res.send(order);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports = {
  placeOrder,
  allOrders,
  order,
};
