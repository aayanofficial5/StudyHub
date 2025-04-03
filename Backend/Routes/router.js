const express = require("express");
const { sendOTP, signup, login } = require("../Controllers/auth.js");

const router = express.Router();
// write routes here

router.post("/sendOTP", sendOTP);
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
