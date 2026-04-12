const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
  fullname: { type: String, minLength: 3, trim: true },
  email: { type: String, unique: true },
  password: String,
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  picture: String,
  gstin: String,
});

const ownerModel = mongoose.model("owner", ownerSchema);
module.exports = ownerModel;
