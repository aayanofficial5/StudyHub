const express = require("express");
const router = express.Router();
const { auth } = require("../Middlewares/Authentication/auth");
const { updateProfilePicture, updateProfile, getUserDetails, deleteAccount } = require("../Controllers/Profile");

// routes

router.put("/updateProfilePicture", auth, updateProfilePicture);
router.put("/updateProfile", auth, updateProfile);
// router.post("/changePassword", auth, changePassword);
router.get("/getUserDetails", auth, getUserDetails);
router.delete("/deleteAccount", auth, deleteAccount);

module.exports= router;
