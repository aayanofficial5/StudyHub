const express = require("express");
const { sendOTP, login, signup } = require("../Controllers/Auth");

const router = express.Router();
// write routes here

router.post("/sendOTP", sendOTP);
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
