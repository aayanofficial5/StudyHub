const express = require("express");
const { sendOTP } = require("../Controllers/auth");


const router = express.Router();
// write routes here

router.post("/sendOTP",sendOTP);

module.exports = router;
