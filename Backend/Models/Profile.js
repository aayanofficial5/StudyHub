const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  // user:{
  //   type:mongoose.Schema.Types.ObjectId,
  //   ref:"User",
  //   required:true
  // },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  dateOfBirth: {
    type: String, // can change the type to date
  },
  about: {
    type: String,
    trim: true,
  },
  contactNumber: {
    type: Number,
    trim: true,
  },
});

module.exports = mongoose.model("Profile",profileSchema);