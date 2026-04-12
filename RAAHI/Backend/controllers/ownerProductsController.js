const productModel = require("../models/product-model");
const upload = require("../config/multer-config");
// owner product creation
const createProduct = async (req, res) => {
  try {
    const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

    const product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });

    res.send(product);
  } catch (error) {
    res.send(error.message);
  }
};

const ownerProducts = async (req, res) => {
  try {
    const ownerId = req.ownerId;
    const { page = 1, limit = 10 } = req.query;

    const products = await productModel
      .find({ owner: ownerId })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const editProduct = async (req, res) => {
  try {
    const ownerId = req.ownerId; // from JWT middleware
    const { productId } = req.params;

    const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

    // Find product and check ownership
    const product = await productModel.findOne({
      _id: productId,
      owner: ownerId,
    });

    if (!product) {
      return res.status(404).send("Product not found or unauthorized");
    }

    // Update fields (only if provided)
    if (name) product.name = name;
    if (price) product.price = price;
    if (discount !== undefined) product.discount = discount;
    if (bgcolor) product.bgcolor = bgcolor;
    if (panelcolor) product.panelcolor = panelcolor;
    if (textcolor) product.textcolor = textcolor;

    await product.save();

    res.send({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  ownerProducts,
  createProduct,
  editProduct,
};
