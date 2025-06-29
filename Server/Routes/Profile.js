const express = require("express");
const router = express.Router();
const {
  updateProfilePicture,
  updateProfile,
  getUserDetails,
  deleteAccount,
  updatePassword,
  getInstructorReports,
} = require("../Controllers/Profile");
const { isInstructor } = require("../Middlewares/Authorization/isInstructor");

// routes

router.patch("/password", updatePassword);
router.delete("/", deleteAccount);
router.put("/picture", updateProfilePicture);
router.put("/", updateProfile);
router.get("/me", getUserDetails);
router.get("/instructor/reports", isInstructor, getInstructorReports);

module.exports = router;
