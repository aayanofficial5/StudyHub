const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

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
    default: Date.now(),    // date are create in ISO format in mongoose but have a different time zone 
    expires: 5 * 60, // document delete automatically after 5 mins
  },
});

// adding mongoose pre middleware

const sendVerificationEmail = async (email,otp)=>{
  try{
    const mailResponse = await mailSender(email,"OTP Verification Email","<h2>This Otp is only valid for 5mins : </h2><h3>"+otp+"</h3>");
    console.log("Email sent successfully...");
    console.log(mailResponse);
  }catch(err){
    console.log("Error occurred while sending email : "+err.message);
  }
}


OTPSchema.pre("save",async function(next){
  await sendVerificationEmail(this.email,this.otp);
  next();
})

module.exports = mongoose.model("OTP", OTPSchema);
