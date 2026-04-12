module.exports = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("Login required");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).send("User not found");
    }

    req.user = user;
    req.userId = user._id;

    next();
  } catch (error) {
    return res.status(401).send("Invalid token");
  }
};
