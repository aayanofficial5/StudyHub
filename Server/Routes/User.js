const express = require("express");
const { sendOTP, login, signup, googleLogin } = require("../Controllers/Auth");
const { resetPassword, resetToken } = require("../Controllers/ResetPassword");
const { contactUsData, getAllContactUsData } = require("../Controllers/ContactUsData");
const router = express.Router();

// write routes here
router.post("/otp", sendOTP);
router.post("/signup", signup);
router.post("/login", login);
router.post("/reset-token", resetToken);
router.post("/reset-password", resetPassword);
router.post("/contact-us", contactUsData);
router.get("/contact-us", getAllContactUsData);
// router.post("/logout", logout);

router.post("/google", googleLogin);

module.exports = router;
