const Section = require("../Models/Section");
const SubSection = require("../Models/SubSection");
const { fileUploader } = require("../utils/fileUploader");
const Category = require("../Models/Category");
const User = require("../models/User");
const Course = require("../models/Course");
const CourseProgress = require("../Models/CourseProgress");
const convertSecondsToDuration = require("../utils/secToDuration");
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
      tag,
      category,
    } = req.body;
    // console.log(req.body);

    // Parse tags if it's a JSON string
    const parsedTags = JSON.parse(tag).map((tag) =>
      tag.toLowerCase().split(" ").join("")
    );
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
      tag: parsedTags,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
    });

    // add this course to instructors course list
    await User.findByIdAndUpdate(instructorDetails._id, {
      $push: { course: newCourse._id },
    });

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

// editCourseDetails
exports.editCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const updateData = { ...req.body };
    delete updateData.courseId;

    // console.log(updateData);
    const thumbnail = req.files?.thumbnail;

    // Validate courseId
    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    // Fetch course details
    const courseDetails = await Course.findById(courseId).populate("category");
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    // --- PUBLISH LOGIC ---
    if (
      updateData.status == "Draft" &&
      courseDetails.studentsEnrolled.length != 0
    ) {
      return res.status(404).json({
        success: false,
        message:
          "Cannot change course visibility. Students are already enrolled.",
      });
    }
    // --- TAG LOGIC ---
    if (updateData.tag) {
      updateData.tag = JSON.parse(updateData.tag).map((tag) =>
        tag.toLowerCase().split(" ").join("")
      );
    }

    // --- THUMBNAIL LOGIC ---
    if (thumbnail) {
      try {
        const thumbnailImage = await fileUploader(
          thumbnail,
          process.env.FOLDER_NAME
        );
        updateData.thumbnail = thumbnailImage?.secure_url;
        // console.log(thumbnailImage);
        // console.log(updateData);
      } catch (error) {
        console.log("Error uploading thumbnail:", error.message);
        return res.status(500).json({
          success: false,
          message: "Error uploading thumbnail",
        });
      }
    }

    // --- CATEGORY LOGIC ---
    if (updateData.category) {
      const categoryDetails = await Category.findOne({
        name: updateData.category,
      });
      if (!categoryDetails) {
        return res.status(400).json({
          success: false,
          message: "Category not found",
        });
      }

      const oldCategoryId = courseDetails.category?._id?.toString();
      const newCategoryId = categoryDetails._id.toString();

      if (oldCategoryId && oldCategoryId !== newCategoryId) {
        await Category.findByIdAndUpdate(oldCategoryId, {
          $pull: { course: courseDetails._id },
        });

        await Category.findByIdAndUpdate(newCategoryId, {
          $push: { course: courseDetails._id },
        });
      }

      // Assign only the ObjectId
      updateData.category = categoryDetails._id;
    }

    // --- UPDATE COURSE ---
    const updatedCourse = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    })
      .populate({ path: "instructor", populate: { path: "additionalDetails" } })
      .populate("category")
      .populate({ path: "courseContent", populate: { path: "subSection" } })
      .populate("tag");

    // --- RESPONSE ---
    return res.status(200).json({
      success: true,
      message: "Course details updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.log("Error occurred while editing course details:", error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while editing course details",
    });
  }
};

// getAllCourses handler function
exports.getAllCourses = async (req, res) => {
  try {
    // fetch all tags from DB
    const allCourses = await Course.find(
      { status: "Published" },
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
      .populate("ratingAndReviews");

    return res.status(200).json({
      success: true,
      data: allCourses,
      message: "All Courses fetched successfully",
    });
  } catch (error) {
    console.log("Error occured while fetching Courses");
    res.status(500).json({
      success: false,
      message: "Error occured while fetching Courses",
    });
  }
};

// getCourseDetails
exports.getCourseDetails = async (req, res) => {
  try {
    // get courseId from request body
    const { courseId } = req.params;
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
      .populate({ path: "ratingAndReviews", populate: { path: "user" } })
      .populate("studentsEnrolled");

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
      data: courseDetails,
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

// deleteCourse
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    const courseDetails = await Course.findById(courseId);
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Get sections
    const sections = await Section.find({ course: courseId }).populate(
      "subSection"
    );
    const sectionIds = sections.map((section) => section._id);

    // delete all lecture videos of the sections from cloudinary
    for (const section of sections) {
      for (const subSection of section.subSection) {
        if (subSection.videoUrl) {
          console.log(subSection.videoUrl);
          await fileDeleter(subSection.videoUrl);
        }
      }
    }

    // Delete subsections of those sections
    const subSectionResult = await SubSection.deleteMany({
      sectionId: { $in: sectionIds },
    });
    // console.log("SubSections deleted:", subSectionResult.deletedCount);

    // Delete sections
    const sectionResult = await Section.deleteMany({ course: courseId });
    // console.log("Sections deleted:", sectionResult.deletedCount);

    //Remove course from other collections
    await User.updateMany({}, { $pull: { course: courseId } });
    await Category.updateMany({}, { $pull: { course: courseId } });

    // Delete the course
    const deletedCourse = await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
      data: deletedCourse,
    });
  } catch (error) {
    console.error("Error while deleting course:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting course",
    });
  }
};

// getInstructorCourses
exports.getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id;
    // console.log("Instructor ID:", instructorId);
    if (!instructorId) {
      return res.status(400).json({
        success: false,
        message: "Instructor ID is required",
      });
    }

    // Retrieve courses taught by the instructor
    const courses = await Course.find({
      instructor: instructorId,
    })
      .sort({ createdAt: -1 })
      .populate("category")
      .populate({ path: "courseContent", populate: { path: "subSection" } })
      .populate("tag");

    return res.status(200).json({
      success: true,
      message: "Courses retrieved successfully",
      data: courses,
    });
  } catch (error) {
    console.error("Error while fetching instructor courses:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching instructor courses",
    });
  }
};

// getStudentCourses
exports.getStudentCourses = async (req, res) => {
  try {
    const studentId = req.user.id;
    // console.log("Student ID:", studentId);
    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: "Student ID is required",
      });
    }

    // Retrieve courses enrolled by the student
    const courses = await Course.find({
      studentsEnrolled: studentId,
    })
      .sort({ createdAt: -1 })
      .populate("category")
      .populate({ path: "courseContent", populate: { path: "subSection" } })
      .populate("tag");
    // console.log("Courses:", courses);
    const data = courses.map((course) => ({
      id: course._id,
      thumbnail: course.thumbnail,
      title: course.courseName,
      description: course.courseDescription,
      duration: course.courseContent.reduce((sum, section) => {
        return (
          sum +
          section.subSection.reduce((subSum, subSec) => {
            return subSum + (parseFloat(subSec.timeDuration) || 0);
          }, 0)
        );
      }, 0),
      progress: course.studentsEnrolled.includes(studentId) ? 50 : 100,
      sectionId: course.courseContent[0]._id,
      subSectionId: course.courseContent[0].subSection[0]._id,
    }));

    return res.status(200).json({
      success: true,
      message: "Courses retrieved successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error while fetching student courses:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching student courses",
    });
  }
};

// getCoursesByTag handler function
exports.getCoursesBySearch = async (req, res) => {
  try {
    const search = req.params.searchTerm; // or req.query.searchTerm if using query param
    console.log(search);
    const courses = await Course.find({
      status: "Published",
      $or: [
        { tag: { $regex: search, $options: "i" } },
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    });

    if (!courses || courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No courses found matching the search.",
      });
    }

    return res.status(200).json({ success: true, data: courses });
  } catch (error) {
    console.error("Error fetching courses by search:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

// getFullCourseDetails
exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      });

    // console.log("courseDetails : ", courseDetails);

    let courseProgressCount = await CourseProgress.findOne({
      courseId: courseId,
      userId: userId,
    });

    // console.log("courseProgressCount : ", courseProgressCount);

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      });
    }

    let totalDurationInSeconds = 0;
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration);
        totalDurationInSeconds += timeDurationInSeconds;
      });
    });

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

    return res.status(200).json({
      success: true,
      message: "Full course details fetched successfully",
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error fetching full course details: ${error.message}`,
    });
  }
};
