const User = require("../Models/User");
const Profile = require("../Models/Profile");
const mailSender = require("../utils/mailSender");
const { accountDeleted } = require("../Templates/Mails/accountDeleted");
// updateProfile handler function
exports.updateProfile = async (req, res) => {
  try {
    // fetch data from request body
    const { contactNumber, dateOfBirth = "", gender, about = "" } = req.body;
    // fetch userId from request
    const userId = req.user.id;
    // validation of data
    if (!contactNumber || !gender) {
      return res.status(400).json({
        success: false,
        message: "Missing Properties",
      });
    }
    // find user by id
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const profileId = user.additionalDetails;
    // find profile by id and update
    const profile = await Profile.findByIdAndUpdate(
      profileId,
      {
        contactNumber,
        dateOfBirth,
        gender,
        about,
      },
      { new: true }
    );
    // return response
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile,
    });
  } catch (error) {
    console.log("Error occurred while updating profile:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating profile",
    });
  }
};

// deleteAccount handler function
exports.deleteAccount = async (req, res) => {
  try {
    // fetch userId from request
    const userId = req.user.id;
    // find user by id
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    // delete profile
    await Profile.findByIdAndDelete(user.additionalDetails);
    // if user is student
    if (user.accountType === "Student") {
      // delete course progress of user
      await CourseProgress.deleteMany({ userId: userId });
      // update courses in which user is enrolled
      await Course.updateMany(
        { studentsEnrolled: userId },
        { $pull: { studentsEnrolled: userId } }
      );
    }

    // delete user
    await User.deleteOne({ _id: userId });
    // send email to user
    await mailSender(
      user.email,
      "Account Deleted Successfully",
      accountDeleted(user.email, user.firstName)
    );
    // return response
    return res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.log("Error occurred while deleting account:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while deleting account",
    });
  }
};

// getUserDetails handler function
exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("additionalDetails");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      user,
    });
  } catch (error) {
    console.log("Error occurred while fetching user details:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while fetching user details",
    });
  }
};
