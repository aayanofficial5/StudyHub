const Section = require("../Models/Section");
const Course = require("../Models/Course");

// createSection handler function
exports.createSection = async (req, res) => {
  try {
    // fetch data from request body
    const { sectionName, courseId } = req.body;
    // validation of data
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Missing Properties",
      });
    }

    // create a new section
    const newSection = await Section.create({
      sectionName,
    });
    // updated course with section ObjectId
    await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { courseContent: newSection._id },
      },
      { new: true }
    )
      .populate({
        path: "courseContent",
        poplulate: {
          path: "subSection",
        },
      })
      .exec();
    // return response
    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      newSection,
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
    const { sectionId, sectionName } = req.body;
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
    );
    // return response
    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      updatedSection,
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
    // fetch data from request body
    const { sectionId } = req.body;
    // validation of data
    if (!sectionId) {
      return res.status(400).json({
        success: false,
        message: "Missing Properties",
      });
    }
    // check if section exists
    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }
    // delete section Id from course
    // await Course.findByIdAndUpdate(
    //   section.courseId,
    //   { $pull: { courseContent: sectionId } },
    //   { new: true }
    // );

    // delete section
    await Section.findByIdAndDelete(sectionId);

    // return response
    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
    });
  } catch (error) {
    console.log("Error occured while deleting section");
    res.status(500).json({
      success: false,
      message: "Error occured while deleting section : " + error.message,
    });
  }
};
