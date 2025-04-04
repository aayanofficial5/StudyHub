const express = require("express");
const {
  sendOTP,
  login,
  signup,
  changePassword,
} = require("../Controllers/Auth");
const { auth } = require("../Middlewares/Authentication/auth");
const { resetPasswordToken } = require("../Controllers/ResetPassword");

const router = express.Router();
// write routes here

router.post("/sendOTP", sendOTP);
router.post("/signup", signup);
router.post("/login", login);
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password/:token", resetPassword);

// testing route
router.post("/testAuth", auth, (req, res) => {
  res.send("This is Protected route for testing");
});

// protected routes
router.post("/changePassword", auth, changePassword);

module.exports = router;
