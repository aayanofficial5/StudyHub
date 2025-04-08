const express = require("express");
const { sendOTP, login, signup } = require("../Controllers/Auth");
const {resetPassword, resetPasswordToken} = require("../Controllers/ResetPassword")

const router = express.Router();

// write routes here
router.post("/send-otp", sendOTP);
router.post("/signup", signup);
router.post("/login", login);
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);
// router.post("/logout", logout);

module.exports = router;
