const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const cookieParser = require("cookie-parser");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const cartRouter = require("./routes/cartRoutes");
const ownerProductsRouter = require("./routes/ownerProductsRoutes");
const orderRouter = require("./routes/orderRoutes");
const connectDB = require("./config/db");
connectDB(); // connection intialisation with atlas DB
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
  }),
);
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/ownerProduct", ownerProductsRouter);
app.use("/order", orderRouter);

// app.listen(3000);
app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
