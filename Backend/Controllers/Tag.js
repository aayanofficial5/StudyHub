const Tag = require("../Models/Tag");

// createTag handler function
exports.createTag = async (req, res) => {
  try {
    // fetch tag data from request body
    const { name } = req.body;
    // validation of tag data
    if (!name) {
      return res.status(400).json({
        success: true,
        message: "All fields are required",
      });
    }

    // check if tag already exists
    const existingTag = await Tag.findOne({ name });
    if (existingTag) {
      return res.status(400).json({
        success: false,
        message: "Tag already exists",
      });
    }
    // create entry in db

    const tagDetails = await Tag.create({ name });

    // console.log(tagDetails);

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
    const allTags = await Tag.find({},{name:true});

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
