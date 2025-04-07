const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const { resetPasswordLink } = require("../Templates/Mails/resetPasswordLink");
const User = require("../Models/User");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { passwordUpdated } = require("../Templates/Mails/passwordUpdated");

exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;
    // validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required,please try again",
      });
    }

    // check for user in DB using email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email",
      });
    }

    // generate a token with 5 min expiry
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });
    // create a reset password link (client's route + token as a parameter)
    const resetLink = `http://localhost:5173/reset-password/${token}`;

    // send this link attached to mail
    const mailResponse = await mailSender(
      email,
      "Password Reset",
      resetPasswordLink(user.firstName, resetLink)
    );

    // send response of email sent successfully
    res.status(200).json({
      success: true,
      message:
        "Email Sent Successfully, Please Check Your Email to Continue Further",
    });
  } catch (error) {
    console.log("Error occurred while sending reset password link to Email");
    res.status(500).json({
      success: true,
      message: "Error occurred while sending reset password link to Email",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    // fetch data from req body
    const { token, password, confirmPassword } = req.body; // frontend puts the token from its url to api body

    // validation of data
    if (!password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are Required",
      });
    }

    // confirm passwords
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords does not match",
      });
    }
    let payload;
    try {
      // decode token and get id
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.log("Token Invalid or Expired.");
      return res.status(400).json({
        success: true,
        message: "Token Invalid or Expired.",
      });
    }

    // hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    // find user in DB and update password
    const user = await User.findByIdAndUpdate(payload.id, {
      password: hashedPassword,
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    console.log("Password Reset Successful");

    // send a mail to user informing of password updation
    await mailSender(
      user.email,
      "Password Reset Successful",
      passwordUpdated(user.email, user.firstName)
    );

    return res.status(200).json({
      success: true,
      message: "Password Reset Successful",
    });
  } catch (error) {
    console.log("Error occurred while updating the Password");
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating the Password",
    });
  }
};
