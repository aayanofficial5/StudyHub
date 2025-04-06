const Tag = require("../Models/Tag");

// createTag handler function
exports.createTag = async (req, res) => {
  try {
    // fetch tag data from request body
    const { name, description } = req.body;
    // validation of tag data
    if (!name || !description) {
      return res.status(400).json({
        success: true,
        message: "All fields are required",
      });
    }

    // create entry in db

    const tagDetails = await Tag.create({ name, description });

    console.log(tagDetails);

    return res.status(201).json({
      success: true,
      message: "Tag created successfully",
    });
  } catch (error) {
    console.log("Error occured while creating tag");
    res.status(500).json({
      success: false,
      message: "Error occured while creating tag : " + error.message,
    });
  }
};

// getAllTags handler function

exports.getAllTags = async (req, res) => {
  try {
    // fetch all tags from DB
    const allTags = await Tag.find({}, { name: true, description: true });

    return res.status(200).json({
      success: true,
      allTags,
      message: "All Tags fetched successfully",
    });
  } catch (error) {
    console.log("Error occured while fetching all tags");
    res.status(500).json({
      success: false,
      message: "Error occured while fetching all tags : " + error.message,
    });
  }
};
