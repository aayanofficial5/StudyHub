const Course = require("../Models/Course");
const Tag = require("../Models/Tag");
const User = require("../Models/User");
const { fileUploader } = require("../utils/fileUploader");
const Category = require("../Models/Category");

// createCourse Handler Function
exports.createCourse = async (req, res) => {
  try {
    // fetch data from request body
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      category,
    } = req.body;
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
      !category ||
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

    // check given category is valid or not
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(400).json({
        success: false,
        message: "Category Details not found",
      });
    }

    // upload thumbnail to cloud

    const thumbnailImage = await fileUploader(
      thumbnail,
      process.env.FOLDER_NAME
    );

    // craete an entry of course

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: user.id,
      whatYouWillLearn,
      price,
      tag: tagDetails._id,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
    });

    // add this course to instructors course list

    await User.findByIdAndUpdate(user.id, {
      $push: { courses: newCourse._id },
    });

    // update the tag schema

    await Tag.findByIdAndUpdate(tag, { $push: { course: newCourse._id } });

    // update the category schema
    await Category.findByIdAndUpdate(category, {
      $push: { course: newCourse._id },
    });

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
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        instructor: true,
        price: true,
        thumbnail: true,
        // ratingAndReviews:true,
        // studentsEnrolled:true,
      }
    );
    // .populate("instructor")
    // .exec();

    return res.status(200).json({
      success: true,
      allCourses,
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

exports.getCourseDetails = async (req, res) => {
  try {
    // get courseId from request body
    const {courseId} = req.body;

    // validate courseId
    if(!courseId){
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    // get course details from DB
    const courseDetails = await Course.findById(courseId)
    .populate({path:"instructor",poplulate:{path:"additionalDetails"}})
    .populate("category")
    .populate({path:"courseContent",populate:{path:"subSection"}})
    .populate("tag")
    .exec();
    
    // validate courseDetails
    if(!courseDetails){
      return res.status(400).json({
        success: false,
        message: "Course Details not found",
      });
    }
    
    // return response
    return res.status(200).json({
      success: true,
      courseDetails,
      message: "Course Details fetched successfully",
    });
  } catch (error) {
    console.log("Error occured while fetching course details : " + error.message);
    return res.status(500).json({
      success: false,
      message: "Error occured while fetching course details",
    });
  }
};
