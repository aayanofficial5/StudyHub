const User = require("../Models/User");
const Profile = require("../Models/Profile");
const mailSender = require("../utils/mailSender");
const { accountDeleted } = require("../Templates/Mails/accountDeleted");
const { fileUploader } = require("../utils/fileUploader");
const { passwordUpdated } = require("../Templates/Mails/passwordUpdated");
const RatingAndReview = require("../Models/RatingAndReview");
const Course = require("../Models/Course");
const CourseProgress = require("../Models/CourseProgress");
const bcrypt = require("bcrypt");

require("dotenv").config();
// updateProfile handler function
exports.updateProfile = async (req, res) => {
  try {
    // fetch data from request body
    const {
      firstName = "",
      lastName = "",
      dateOfBirth = "",
      about = "",
      contactNumber = "",
      gender = "",
    } = req.body;
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
    // if user found
    user.firstName = firstName;
    user.lastName = lastName;
    await user.save();

    const profileId = user.additionalDetails;
    // find profile by id and update
    const profile = await Profile.findByIdAndUpdate(profileId, {
      contactNumber,
      dateOfBirth,
      gender,
      about,
    });
    // return response
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
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
    // update rating and reviews of user
    await RatingAndReview.updateMany({ user: userId }, { user: null });
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

    // if user is instructor
    if (user.accountType === "Instructor") {
      // update courses in which user is enrolled
      await Course.updateMany({ instructor: userId }, { instructor: null });
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
    user.password = undefined;
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

// updateProfilePicture handler function
exports.updateProfilePicture = async (req, res) => {
  try {
    // fetch userId from request
    const userId = req.user.id;
    // fetch profile picture from request
    const profilePicture = req.files?.profilePicture;
    // find user by id
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    // validation of profile picture
    if (!profilePicture) {
      return res.status(400).json({
        success: false,
        message: "Profile picture is required",
      });
    }
    // upload profile picture to cloudinary
    const uploadDetails = await fileUploader(
      profilePicture,
      process.env.FOLDER_NAME,
      0,
      0
    );
    // update profile picture in database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        image: uploadDetails.secure_url,
      },
      { new: true }
    );

    // return response
    return res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      profilePicture: updatedUser.image,
    });
  } catch (error) {
    console.log("Error occurred while updating profile picture:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating profile picture",
    });
  }
};

// changePassword
exports.updatePassword = async (req, res) => {
  try {
    // fetch data from req.body and req.user
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    const userId = req.user.id;

    // find user by id
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // validate data
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required, please try again",
      });
    }

    // confirm new password
    if (newPassword != confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "new password & confirm new password does not match",
      });
    }

    // check if new password is same as old password
    if (newPassword === oldPassword) {
      return res.status(400).json({
        success: false,
        message: "New password cannot be same as old password",
      });
    }

    // fetch stored hashed password of user & compare with user entered password
    const isMatched = await bcrypt.compare(oldPassword, user.password); // it means compare(textPassword,hashedPassword)

    if (!isMatched) {
      return res.status(401).json({
        success: false,
        message: "The password is incorrect, please enter correct password",
      });
    }

    // update password in DB to new hashed password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedDetails = await User.findByIdAndUpdate(user.id, {
      password: hashedPassword,
    });
    // sending mail to inform about password upadation
    try {
      const emailResponse = await mailSender(
        updatedDetails.email,
        "Account Password changed",
        passwordUpdated(updatedDetails.email, updatedDetails.firstName)
      );
      console.log("Email sent successfully...");
    } catch (error) {
      console.error("Error occurred while sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      });
    }

    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Error occurred while updating password:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    });
  }
};
