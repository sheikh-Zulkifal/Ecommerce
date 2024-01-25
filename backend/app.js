const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

const errorMiddleware = require("../backend/middlewares/error.js");

app.use(express.json());
app.use(cookieParser());

//Route import
const product = require("./routes/productRoute.js");
const user = require("../backend/routes/userRoute.js");
const order = require("../backend/routes/orderRoute.js");
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

// Middleware for error

app.use(errorMiddleware);

module.exports = app;
