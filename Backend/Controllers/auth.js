const OTP = require("../Models/OTP");
const User = require("../Models/User");
const Profile = require("../Models/Profile");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// sendOTP
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email presence
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required!",
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with the given email.",
      });
    }

    // Generate a unique OTP
    let otp, existingOTP;
    do {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      existingOTP = await OTP.findOne({ otp });
    } while (existingOTP);

    // Create an OTP document in the database
    const otpPayload = { email, otp };
    const otpDocument = await OTP.create(otpPayload);
    // console.log("Generated OTP:", otpDocument);

    // Send success response
    return res.status(200).json({
      success: true,
      message: "OTP sent successfully!",
      otp: otpDocument, // Sending OTP for testing
    });
  } catch (error) {
    // console.error("OTP Sending Error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to send OTP. Please try again later.",
    });
  }
};

// signup
exports.signup = async (req, res) => {
  try {
    // Fetch form data & OTP from req.body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      otp,
    } = req.body;

    // console.log(req.body);

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    // Validate password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password & Confirm Password do not match. Please try again.",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already registered!",
      });
    }

    // Fetch the most recent OTP for the user
    const recentOTP = await OTP.findOne({ email }).sort({ createdAt: -1 });
    // Check if OTP exists
    if (!recentOTP) {
      return res.status(400).json({
        success: false,
        message: "OTP not sent or has expired. Please request a new one.",
      });
    }

    // console.log(recentOTP.otp);

    // Validate OTP
    if (otp !== recentOTP.otp) {
      return res.status(400).json({
        success: false,
        message: "Incorrect OTP. Please try again.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    // Create user data entry in the database

    // entry in profile collection
    const additionalDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    console.log(additionalDetails);

    // entry in user collection
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      additionalDetails,
      image: `https://ui-avatars.com/api/?name=${firstName}+${lastName}`,
    });

    console.log(user);
    // Send success response
    return res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};
