const productModel = require("../models/product-model");

const getAllProducts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const products = await productModel
    .find()
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.send(products);
};

module.exports = {
  getAllProducts,
};
