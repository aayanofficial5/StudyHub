const mongoose = require("mongoose");
const mailSender = require("../../utils/mailSender");

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
    default: Date.now(),
    expires: 5 * 60, // document delete automatically after 5 mins
  },
});

async function sendVerificationEmail(email, otp) {}

OTPSchema.pre("save", async function (next) {
  await sendVerificationEmail(this.email, this.otp);
  next();
});
module.exports = mongoose.model("OTP", OTPSchema);
