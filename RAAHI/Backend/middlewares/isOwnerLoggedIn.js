const ownerModel = require("../models/owner-model");

module.exports = async (req, res, next) => {
  if (!req.cookies.token) {
    req.flash("error", "Owner login required");
    return res.redirect("/owner/login");
  }

  try {
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);

    const owner = await ownerModel.findById(decoded.id).select("-password");

    if (!owner) {
      req.flash("error", "Owner not found");
      return res.redirect("/owner/login");
    }

    req.owner = owner;
    req.ownerId = owner._id; // 🔥 important

    next();
  } catch (error) {
    req.flash("error", "Invalid token");
    res.redirect("/owner/login");
  }
};
