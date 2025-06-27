const mongoose = require("mongoose");
const SubSection = require("../Models/SubSection");
const CourseProgress = require("../Models/CourseProgress");

exports.updateCourseProgress = async (req, res) => {
  const { courseId, subSectionId } = req.body;
  const userId = req.user.id;
  try {
    const subSection = await SubSection.findById(subSectionId);
    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "Invalid Lecture",
      });
    }

    let courseProgress = await CourseProgress.findOne({
      courseId: courseId,
      userId: userId,
    });
    // console.log("Course Progress:", courseProgress);
    if (!courseProgress) {
      return res.status(404).json({
        success: false,
        message: "Course progress Does Not Exist",
      });
    } else {
      if (courseProgress.completedVideos.includes(subSectionId)) {
        return res.status(400).json({
          success: false,
          message: "Lecture already completed",
        });
      }
      courseProgress.completedVideos.push(subSectionId);
    }
    await courseProgress.save();
    return res.status(200).json({
      success: true,
      message: "Lecture Completed Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: error.message || "Lecture Completion Failed",
    });
  }
};
