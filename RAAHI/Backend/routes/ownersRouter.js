const express = require("express");
const {
  registerOwner,
  loginOwner,
} = require("../controllers/ownerauthController");
const router = express.Router();

// owner register
router.post("/oregister", registerOwner);
router.post("/ologin", loginOwner);
module.exports = router;
