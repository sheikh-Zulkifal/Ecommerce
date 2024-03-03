const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controlllers/paymentController.js");
const router = express.Router();
const { isAuthenticatedUser } = require("../middlewares/auth");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);

router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);
module.exports = router;
