const express = require("express");
const router = express.Router();
const {
  updateProfilePicture,
  updateProfile,
  getUserDetails,
  deleteAccount,
  updatePassword,
} = require("../Controllers/Profile");

// routes

router.patch("/password", updatePassword);
router.delete("/", deleteAccount);
router.put("/picture", updateProfilePicture);
router.put("/", updateProfile);
router.get("/me", getUserDetails);

module.exports = router;
