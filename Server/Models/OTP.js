const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const { otpVerification } = require("../Templates/Mails/otpVerification");

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(), // date are created in ISO format in mongoose but have a different time zone
    expires: 5 * 60, // document delete automatically after metioned seconds
  },
});

// adding mongoose pre middleware

const sendVerificationEmail = async (email, otp) => {
  try {
    const mailResponse = await mailSender(
      email,
      "OTP Verification Email",
      otpVerification(otp)
    );
    console.log("OTP Email sent successfully...");
  } catch (err) {
    console.log("Error occurred while sending email : " + err.message);
  }
};

OTPSchema.pre("save", async function (next) {
  await sendVerificationEmail(this.email, this.otp);
  next();
});

module.exports = mongoose.model("OTP", OTPSchema);
