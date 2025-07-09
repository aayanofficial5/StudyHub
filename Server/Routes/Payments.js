const express = require("express");
const {
  capturePayment,
  verifyPayment,
  sendPaymentSuccessEmail,
  enrollFreeCourse,
} = require("../Controllers/Payment");
const router = express.Router();

// routes

router.post("/capture", capturePayment);
router.post("/verify", verifyPayment);
router.post("/success-email", sendPaymentSuccessEmail);
router.post("/enroll-free-course", enrollFreeCourse);

module.exports = router;
