const express = require("express");
const router = express.Router();
const { auth } = require("../Middlewares/Authentication/auth");
const {
  updateProfilePicture,
  updateProfile,
  getUserDetails,
  deleteAccount,
  updatePassword,
} = require("../Controllers/Profile");

// routes

router.patch("/update-password", auth, updatePassword);
router.delete("/delete-account", auth, deleteAccount);
router.put("/update-profile-picture", auth, updateProfilePicture);
router.put("/update-profile", auth, updateProfile);
router.get("/get-user-details", auth, getUserDetails);

module.exports = router;
