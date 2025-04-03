const OTP = require("../Models/OTP");
const User = require("../Models/User");
const otpGenerator = require("otp-generator");

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    // check if user exists
    if (await User.findOne({ email })) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists with Given Email.",
      });
    }
    let result = null;
    let otp;
    do {
      // generate otp
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      // check otp is unique or not
      result = await OTP.findOne({ otp });
    } while (result !== null);
    // console.log(result);

    const otpPayload = { email, otp };
    // create a OTP document in database
    const document = await OTP.create(otpPayload);
    console.log(document);
    res.status(200).json({
      success: true,
      data: document,
      message: "OTP sent Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to send OTP",
    });
  }
};

exports.signup = async (req, res) => {
  // data fetch from request ki body
  // validate krlo
  
};
