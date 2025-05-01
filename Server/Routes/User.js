const express = require("express");
const { sendOTP, login, signup } = require("../Controllers/Auth");
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

// Google Auth Routes
// router.get("/google", passport.authenticate("google", {
//   scope: ["profile", "email"],
// }));

// router.get("/google/callback", passport.authenticate("google", {
//   failureRedirect: "${process.env.FRONTEND_URL}/login",
//   successRedirect: `${process.env.FRONTEND_URL}/dashboard/my-profile`, // or send token from here
// }));

module.exports = router;
