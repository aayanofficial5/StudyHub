const Section = require("../Models/Section");
const Course = require("../Models/Course");
const SubSection = require("../Models/SubSection");
const { fileDeleter } = require("../utils/fileDeleter");
// createSection handler function
exports.createSection = async (req, res) => {
  try {
    // fetch data from request body
    const { sectionName, courseId } = req.body;
    // validation of data
    // console.log(req.body);
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Missing Properties",
      });
    }

    // create a new section
    const newSection = await Section.create({
      sectionName,
      courseId,
    });
    // updated course with section ObjectId
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { courseContent: newSection._id },
      },
      { new: true }
    ).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    });

    // return response
    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.log("Error occured while creating section");
    res.status(500).json({
      success: false,
      message: "Error occured while creating section : " + error.message,
    });
  }
};

// updateSection handler function
exports.updateSection = async (req, res) => {
  try {
    // fetch data from request body
    const { sectionName, sectionId } = req.body;
    // validation of data
    if (!sectionId || !sectionName) {
      return res.status(400).json({
        success: false,
        message: "Missing Properties",
      });
    }

    // update section
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    ).populate("subSection");

    // return response
    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.log("Error occured while updating section");
    res.status(500).json({
      success: false,
      message: "Error occured while updating section : " + error.message,
    });
  }
};

// deleteSection handler function
exports.deleteSection = async (req, res) => {
  try {
    // Fetch data from request body
    const { sectionId, courseId } = req.body;

    // Validate input data
    if (!sectionId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Missing Properties",
      });
    }

    // Find all subsections of the section
    const subSections = await SubSection.find({ sectionId });

    // Delete all lecture videos from cloudinary concurrently
    await Promise.all(
      subSections.map(async (subSection) => {
        if (subSection.videoUrl) {
          console.log("Deleting video:", subSection.videoUrl);
          await fileDeleter(subSection.videoUrl, "video");
        }
      })
    );

    // Delete all subsections
    await SubSection.deleteMany({ sectionId });

    // Remove section reference from course
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $pull: { courseContent: sectionId } },
      { new: true }
    ).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    });

    // Delete the section itself
    const section = await Section.findByIdAndDelete(sectionId);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // Respond with success
    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.log("Error occurred while deleting section:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error occurred while deleting section",
    });
  }
};
