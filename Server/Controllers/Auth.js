const OTP = require("../Models/OTP");
const User = require("../Models/User");
const Profile = require("../Models/Profile");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
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
    // console.log(hashedPassword);

    // Create user data entry in the database

    // entry in profile collection
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    // console.log(profileDetails);

    // entry in user collection
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://ui-avatars.com/api/?name=${firstName}+${lastName}`,
    });

    // console.log(user);

    // Send success response
    return res.status(201).json({
      success: true,
      message: "User registered successfully!",
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

// login
exports.login = async (req, res) => {
  try {
    // Get data from request body
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required. Please try again.",
      });
    }

    // Check if user exists
    let user = await User.findOne({ email }).populate("additionalDetails");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User is not registered. Please sign up first.",
      });
    }

    // Compare entered password with stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(403).json({
        success: false,
        message: "Password is incorrect. Please try again.",
      });
    }

    // Create payload for token
    const payload = {
      id: user._id,
      firstName: user.firstName,
      email: user.email,
      accountType: user.accountType,
    };

    // Generate JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });

    // Prepare user object for response
    user = user.toObject();
    user.token = token;
    user.password = undefined;

    // Cookie options
    const options = {
      httpOnly: true, // prevents client-side JS from accessing the cookie
      expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days
    };

    // Set token in cookie and return response
    return res.cookie("token", token, options).status(200).json({
      success: true,
      message: "Logged in successfully.",
      user,
    });
  } catch (error) {
    console.error("Login failure:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed. Please try again later.",
    });
  }
};

// googleLogin
exports.googleLogin = async (req, res) => {
  try {
    const { access_token, accountType } = req.body;
    // console.log("Google Login Access Token:", access_token);
    // console.log("Account Type:", accountType);
    if (!access_token) {
      return res
        .status(400)
        .json({ success: false, message: "Access token is missing." });
    }

    const googleRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`
    );

    const { id: googleId, email, name, picture } = googleRes.data;
    // console.log(picture);
    let user = await User.findOne({ email }).populate("additionalDetails");
    // console.log("User found:", user);
    if (!user) {
      const profileDetails = await Profile.create({
        gender: null,
        dateOfBirth: null,
        about: null,
        contactNumber: null,
      });
      const [firstName, lastName] = name.split(" ");
      user = await User.create({
        firstName,
        lastName,
        email,
        password: "GOOGLE_OAUTH_NO_PASSWORD", // Ensure your schema allows this
        accountType: accountType,
        additionalDetails: profileDetails._id,
        image:
          picture ||
          `https://ui-avatars.com/api/?name=${firstName}+${lastName}`,
        googleId,
      });
    }

    const jwtPayload = {
      id: user._id,
      firstName: user.firstName,
      email: user.email,
      accountType: user.accountType,
    };

    const jwtToken = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });

    user = user.toObject();
    user.token = jwtToken;
    user.password = undefined;

    const options = {
      httpOnly: true,
      expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    };

    return res.cookie("token", jwtToken, options).status(200).json({
      success: true,
      message: "Google sign-in successful",
      user,
    });
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(
        "Axios error during Google login:",
        err.response?.data || err.message
      );
    } else {
      console.error("Google Login Error:", err);
    }
    return res.status(500).json({
      success: false,
      message: "Google sign-in failed. Please try again later.",
    });
  }
};
