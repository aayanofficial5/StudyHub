const ContactUsData = require("../Models/ContactUsData.js");
// Contact Us Data
exports.contactUsData = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, message } = req.body;
    const contactUsData = await ContactUsData.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      message,
    });
    res.status(200).json({
      success: true,
      message: "Message Received Successfully",
      data: contactUsData,
    });
  } catch (error) {
    console.log("Error in contact us data" + error);
    res.status(500).json({
      success: false,
      message: "Failed to send message , please try again later",
    });
  }
};

// Get All Contact Us Data
exports.getAllContactUsData = async (req, res) => {
  try {
    const contactUsData = await ContactUsData.find();
    res.status(200).json({
      success: true,
      message: "Contact Us Data Fetched Successfully",
      data: contactUsData,
    });
  } catch (error) {
    console.log("Error in get all contact us data" + error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch contact us data , please try again later",
    });
  }
};
