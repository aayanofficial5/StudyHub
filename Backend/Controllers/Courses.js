const Course = require("../Models/Course");
const Tag = require("../Models/Tag");
const User = require("../Models/User");
const { imageUploader } = require("../utils/imageUploader");

// createCourse Handler Function
exports.createCourse = async (req, res) => {
  try {
    // fetch data from request body
    const { courseName, courseDescription, whatYouWillLearn, price, tag } =
      req.body;
    // fetch user from request
    const user = req.user;
    // fetch image from req.files
    const thumbnail = req.files.thumbnailImage;

    // validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !thumbnail
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check given tag is valid or not
    const tagDetails = await Tag.findById(tag);
    if (!tagDetails) {
      return res.status(400).json({
        success: false,
        message: "Tag Details not found",
      });
    }

    // upload thumbnail to cloud

    const thumbnailImage = await imageUploader(thumbnail, user.accountType);

    // craete an entry of course

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: user.id,
      whatYouWillLearn,
      price,
      tag: tagDetails._id,
      thumbnail: thumbnailImage.secure_url,
    });

    // add this course to instructors course list

    await User.findByIdAndUpdate(user.id, {
      $push: { courses: newCourse._id },
    });

    // update the tag schema

    await Tag.findByIdAndUpdate(tag, { $push: { course: newCourse._id } });

    return res.status(200).json({
      success: true,
      data: newCourse,
      message: "Course Created Successfully",
    });
  } catch (error) {
    console.log("error occurred while creting the course : " + error);
    return res.status(500).json({
      success: false,
      message: "Failed to create course!",
    });
  }
};

// getAllCourses handler function

exports.getAllCourses = async (req, res) => {
  try {
    // fetch all tags from DB
    const allCourses = await Tag.find(
      {},
      {
        courseName: true,
        instructor: true,
        price: true,
        thumbnail: true,
        // ratingAndReviews:true,
        // studentsEnrolled:true,
      }
    )
      // .populate("instructor")
      // .exec();

    return res.status(200).json({
      success: true,
      allTags,
      message: "All Courses fetched successfully",
    });
  } catch (error) {
    console.log("Error occured while fetching all Courses");
    res.status(500).json({
      success: false,
      message: "Error occured while fetching all Courses : " + error.message,
    });
  }
};
