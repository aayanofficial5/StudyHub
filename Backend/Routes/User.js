const express = require("express");
const { sendOTP, login, signup } = require("../Controllers/Auth");
const { resetPassword, resetToken } = require("../Controllers/ResetPassword");

const router = express.Router();

// write routes here
router.post("/otp", sendOTP);
router.post("/signup", signup);
router.post("/login", login);
router.post("/reset-token", resetToken);
router.post("/reset-password", resetPassword);
// router.post("/logout", logout);

module.exports = router;
