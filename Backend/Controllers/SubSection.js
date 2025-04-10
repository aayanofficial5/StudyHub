const SubSection = require("../Models/SubSection");
const Section = require("../Models/Section");
const { fileUploader } = require("../utils/fileUploader");
const { fileDeleter } = require("../utils/fileDeleter");
// createSubSection handler function
exports.createSubSection = async (req, res) => {
  try {
    // fetch data from request body
    const { subSectionName, description, timeDuration } = req.body;
    // fetch video from request
    const video = req.files.video;
    const sectionId = req.params.sectionId;

    // validation of data
    if (
      !sectionId ||
      !subSectionName ||
      !description ||
      !timeDuration ||
      !video
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing Properties",
      });
    }
    // upload video to cloudinary
    const { secure_url } = await fileUploader(video, process.env.FOLDER_NAME);
    // create a new subSection
    const newSubSection = await SubSection.create({
      subSectionName,
      description,
      timeDuration,
      videoUrl: secure_url,
      sectionId,
    });
    // update section with subSectionId
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: { subSection: newSubSection._id },
      },
      { new: true }
    ).populate("subSection");

    // return response
    return res.status(200).json({
      success: true,
      message: "SubSection created successfully",
      updatedSection,
    });
  } catch (error) {
    console.log("Error occured while creating subSection");
    res.status(500).json({
      success: false,
      message: "Error occured while creating subSection : " + error.message,
    });
  }
};

// updateSubSection handler function
exports.updateSubSection = async (req, res) => {
  try {
    const { subSectionName=0, description=0, timeDuration=0 } = req.body;
    // fetch video from request
    const video = req.files?.video;
    const subSectionId = req.params?.subSectionId;

    // check if subSectionId is present
    if(!subSectionId){
      return res.status(400).json({
        success: false,
        message: "Missing Section Id",
      });
    }
    // check if subSection is present
    const subSection = await SubSection.findById(subSectionId);
    if(!subSection){
      return res.status(400).json({
        success: false,
        message: "SubSection not found",
      });
    }
    // upload video to cloudinary
    let secure_url = subSection.videoUrl;
    if(video){
      const { secure_url } = await fileUploader(video, process.env.FOLDER_NAME);
    }

    // update subSection
    const updatedSubSection = await SubSection.findByIdAndUpdate(
      subSectionId,
      {
        subSectionName: subSectionName || subSection.subSectionName,
        description: description || subSection.description,
        timeDuration: timeDuration || subSection.timeDuration,
        videoUrl: secure_url,
      },
      { new: true }
    );

    // return response
    return res.status(200).json({
      success: true,
      message: "SubSection updated successfully",
      updatedSubSection,
    });
  } catch (error) {
    console.log("Error occured while updating subSection");
    res.status(500).json({
      success: false,
      message: "Error occured while updating subSection : " + error.message,
    });
  }
};

// deleteSubSection handler function
exports.deleteSubSection = async (req, res) => {
  try {
    const subSectionId = req.params.subSectionId;
    const sectionId = req.params.sectionId;
    // validation of data
    if (!subSectionId || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "Missing Properties",
      });
    }

    // check if subSection is present
    const subSection = await SubSection.findById(subSectionId);
    if (!subSection) {
      return res.status(400).json({
        success: false,
        message: "SubSection not found",
      });
    }
    // delete video from cloudinary
    if (subSection.videoUrl) {
      const publicId = subSection.videoUrl.split("/").pop().split(".")[0];
      await fileDeleter(publicId);
    }
    // delete subSection Id from section
    const updatedSection = await Section.findByIdAndUpdate(
      subSection.sectionId,
      { $pull: { subSection: subSectionId } },
      { new: true }
    );
    // delete subSection
    await SubSection.findByIdAndDelete(subSectionId);

    // return response
    return res.status(200).json({
      success: true,
      message: "SubSection deleted successfully",
      updatedSection,
    });
  } catch (error) {
    console.log("Error occured while deleting subSection");
    res.status(500).json({
      success: false,
      message: "Error occured while deleting subSection : " + error.message,
    });
  }
};
