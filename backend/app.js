const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const app = express();
app.use(
  express.json({
    limit: "50mb",
  })
);
const cors = require("cors");
const dotenv = require("dotenv");

const errorMiddleware = require("../backend/middlewares/error.js");

//Config
dotenv.config({ path: "backend/config/config.env" });

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
//Route import
const product = require("./routes/productRoute.js");
const user = require("../backend/routes/userRoute.js");
const order = require("../backend/routes/orderRoute.js");
const payment = require("../backend/routes/paymentRoute.js");
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// Middleware for error

app.use(errorMiddleware);

module.exports = app;
