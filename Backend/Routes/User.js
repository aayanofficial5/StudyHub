const express = require("express");
const {
  sendOTP,
  login,
  signup,
  changePassword,
} = require("../Controllers/Auth");
const { auth } = require("../Middlewares/Authentication/auth");
const {
  resetPasswordToken,
  resetPassword,
} = require("../Controllers/ResetPassword");
const { getAllCourses } = require("../Controllers/Courses");
// const { localFileUpload , cloudFileUpload } = require("../Controllers/FileUpload");
const { getUserDetails, deleteAccount } = require("../Controllers/Profile");

const router = express.Router();
// write routes here

router.post("/sendOTP", sendOTP);
router.post("/signup", signup);
router.post("/login", login);
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

// protected routes
router.post("/changePassword", auth, changePassword);
router.get("/getUserDetails", auth, getUserDetails);
router.delete("/deleteAccount", auth, deleteAccount);
router.post("/getAllCourses", getAllCourses);

// testing routes
// router.post("/test-auth", auth, (req, res) => {
//   res.send("This is Protected route for testing");
// });
// router.post("/local-file-upload",localFileUpload);
// router.post("/cloud-file-upload",auth,cloudFileUpload);

module.exports = router;
