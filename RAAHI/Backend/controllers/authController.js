const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.send("please fill all the details");
    }
    // check for an existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.send("User is already registered with this email.");
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = await userModel.create({
      email,
      password: hash,
      name,
    });

    const token = generateToken(user);
    res.cookie("token", token);

    res.send("User created successfully");
  } catch (error) {
    res.send(error.message);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.send("Credentials are missing");
  }

  // check whether email is exist or not
  const existingUser = await userModel.findOne({ email });
  if (!existingUser) {
    return res.send("User is not registered");
  }

  const match = bcrypt.compareSync(password, existingUser.password);

  if (match) {
    // res.send("User has logged in");
    const token = generateToken(existingUser);
    res.cookie("token", token);
    res.send("User has logged in");
  } else {
    res.send("Password is wrong");
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token");

  res.send("User logged out successfully");
};
module.exports = { registerUser, loginUser, logoutUser };
