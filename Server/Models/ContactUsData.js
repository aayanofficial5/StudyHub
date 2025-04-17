const mongoose = require("mongoose");

const contactUsDataSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("ContactUsData", contactUsDataSchema);
