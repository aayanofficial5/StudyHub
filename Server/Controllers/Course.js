const Course = require("../Models/Course");
const Section = require("../Models/Section");
const SubSection = require("../Models/SubSection");
const Tag = require("../Models/Tag");
const User = require("../Models/User");
const { fileUploader } = require("../utils/fileUploader");
const Category = require("../Models/Category");
require("dotenv").config();

// createCourse Handler Function
exports.createCourse = async (req, res) => {
  try {
    // fetch data from request body
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tags,
      category,
    } = req.body;
    console.log(req.body);
    // Parse tags if it's a JSON string
    const parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags;

    // fetch user from request
    const user = req.user;
    // fetch image from req.files
    const thumbnail = req.files?.thumbnail;

    // validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !category ||
      !parsedTags ||
      !thumbnail
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // check if user exists
    const instructorDetails = await User.findById(user.id);
    if (!instructorDetails) {
      return res.status(400).json({
        success: false,
        message: "Instructor Details not found",
      });
    }

    // check given category is valid or not
    const categoryDetails = await Category.findOne({ name: category });
    if (!categoryDetails) {
      return res.status(400).json({
        success: false,
        message: "Category Details not found",
      });
    }

    // check given tag is valid or not
    const existingTags = await Tag.find({ name: { $in: parsedTags } });
    let allTags = [];
    if (existingTags.length != parsedTags.length) {
      // find existing tags name
      const existingTagsName = existingTags.map((tag) => tag.name);
      // find missing tags
      const missingTags = parsedTags.filter(
        (tag) => !existingTagsName.includes(tag)
      );
      // insert all missing tags
      const newTags = await Tag.insertMany(
        missingTags.map((tag) => ({ name: tag }))
      );
      // merge existing and new tags
      allTags = [...existingTags, ...newTags];
    } else {
      allTags = existingTags;
    }

    const allTagsId = allTags.map((tag) => tag._id);

    // upload thumbnail to cloud
    let thumbnailImage;
    try {
      thumbnailImage = await fileUploader(thumbnail, process.env.FOLDER_NAME);
    } catch (error) {
      console.log("Error uploading thumbnail:", error);
      return res.status(500).json({
        success: false,
        message: "Error uploading thumbnail",
      });
    }

    // create an entry of course

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn,
      price,
      tag: allTagsId,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
    });

    // add this course to instructors course list
    await User.findByIdAndUpdate(instructorDetails._id, {
      $push: { course: newCourse._id },
    });

    // update the tag schema
    await Tag.updateMany(
      { _id: { $in: allTagsId } },
      { $push: { course: newCourse._id } }
    );

    // update the category schema
    await Category.findByIdAndUpdate(categoryDetails._id, {
      $push: { course: newCourse._id },
    });

    return res.status(200).json({
      success: true,
      data: newCourse,
      message: "Course Created Successfully",
    });
  } catch (error) {
    console.log("error occurred while creating the course : " + error);
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
        ratingAndReviews: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor")
      .populate("ratingAndReviews")
      .populate("studentsEnrolled");

    return res.status(200).json({
      success: true,
      data:allCourses,
      message: "All Courses fetched successfully",
    });
  } catch (error) {
    console.log("Error occured while fetching Courses");
    res.status(500).json({
      success: false,
      message: "Error occured while fetching Courses"
    });
  }
};

// getCourseDetails
exports.getCourseDetails = async (req, res) => {
  try {
    // get courseId from request body
    const {courseId} = req.body;

    // validate courseId
    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    // get course details from DB
    const courseDetails = await Course.findById(courseId)
      .populate({ path: "instructor", populate: { path: "additionalDetails" } })
      .populate("category")
      .populate({ path: "courseContent", populate: { path: "subSection" } })
      .populate("tag")
      .exec();

    // validate courseDetails
    if (!courseDetails) {
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
    console.log(
      "Error occured while fetching course details : " + error.message
    );
    return res.status(500).json({
      success: false,
      message: "Error occured while fetching course details",
    });
  }
};

// editCourseDetails
exports.editCourseDetails = async (req, res) => {
  try {
    const {courseId} = req.body;
    const {
      courseName = "",
      courseDescription = "",
      whatYouWillLearn = "",
      price = "",
      thumbnail = "",
    } = req.body;

    // validate courseId
    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    // upload thumbnail to cloud
    let thumbnailImage = null;
    if (thumbnail) {
      try {
        thumbnailImage = await fileUploader(thumbnail, process.env.FOLDER_NAME);
      } catch (error) {
        console.log("Error uploading thumbnail:", error);
        return res.status(500).json({
          success: false,
          message: "Error uploading thumbnail",
        });
      }
    }

    // get course details from DB
    const courseDetails = await Course.findById(courseId);
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: "Course Details not found",
      });
    }

    // update course details
    await Course.findByIdAndUpdate(courseId, {
      courseName: courseName || courseDetails.courseName,
      courseDescription: courseDescription || courseDetails.courseDescription,
      whatYouWillLearn: whatYouWillLearn || courseDetails.whatYouWillLearn,
      price: price || courseDetails.price,
      thumbnail: thumbnailImage?.secure_url || courseDetails.thumbnail,
    });

    // return response
    return res.status(200).json({
      success: true,
      message: "Course details updated successfully",
    });
  } catch (error) {
    console.log(
      "Error occured while editing course details : " + error.message
    );
    return res.status(500).json({
      success: false,
      message: "Error occured while editing course details",
    });
  }
};

// deleteCourse
exports.deleteCourse = async (req, res) => {
  try {
    const {courseId} = req.body;

    // validate courseId
    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    // get course details from DB
    const courseDetails = await Course.findById(courseId);
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: "Course Details not found",
      });
    }

    // delete course from DB
    await Course.findByIdAndDelete(courseId);

    // delete course from sections
    const sections = await Section.deleteMany({ course: courseId });

    console.log("Sections deleted : " + sections.length);

    // delete course from subSections
    const subSections = await SubSection.deleteMany({
      sectionId: { $in: sections.map((section) => section._id) },
    });

    console.log("SubSections deleted : " + subSections.length);

    // delete course from users
    await User.updateMany(
      { course: courseId },
      { $pull: { course: courseId } }
    );

    // delete course from tags
    await Tag.updateMany({ course: courseId }, { $pull: { course: courseId } });

    // delete course from category
    await Category.updateMany(
      { course: courseId },
      { $pull: { course: courseId } }
    );

    // return response
    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.log("Error occured while deleting course : " + error.message);
    return res.status(500).json({
      success: false,
      message: "Error occured while deleting course",
    });
  }
};
