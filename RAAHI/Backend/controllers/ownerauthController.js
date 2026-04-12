const bcrypt = require("bcrypt");
const ownerModel = require("../models/owner-model");
const generateToken = require("../utils/generateToken");
const registerOwner = async (req, res) => {
  const { fullname, email, password, gstin } = req.body;

  const existing = await ownerModel.findOne({ email });
  if (existing) return res.send("Owner already exists");

  const hashed = await bcrypt.hash(password, 10);

  const owner = await ownerModel.create({
    fullname,
    email,
    password: hashed,
    gstin,
  });

  res.send(owner);
};

const loginOwner = async (req, res) => {
  const { email, password } = req.body;

  const owner = await ownerModel.findOne({ email });
  if (!owner) return res.send("Owner not found");

  const match = await bcrypt.compare(password, owner.password);
  if (match) {
    const token = generateToken(owner);
    res.cookie("token", token);
  }
  if (!match) return res.send("Invalid credentials");

  res.send(owner);
};
module.exports = { registerOwner, loginOwner };
