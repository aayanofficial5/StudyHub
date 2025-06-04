const express = require("express");
const { capturePayment, verifyPayment, sendPaymentSuccessEmail } = require("../Controllers/Payment");
const router = express.Router();


// routes

router.post("/capture", capturePayment);
router.post("/verify", verifyPayment);
router.post("/success-email", sendPaymentSuccessEmail);


module.exports= router;
