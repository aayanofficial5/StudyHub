const Category = require("../Models/Category");

// createCategory handler function
exports.createCategory = async (req, res) => {
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

    // check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    // create entry in db
    await Category.create({ name, description });

    // console.log(categoryDetails);

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
    });
  } catch (error) {
    console.log("Error occured while creating category");
    res.status(500).json({
      success: false,
      message: "Error occured while creating category : " + error.message,
    });
  }
};

// getAllCategories handler function

exports.getAllCategories = async (req, res) => {
  try {
    // fetch all tags from DB
    const allCategories = await Category.find(
      {},
      { name: true, description: true }
    );

    return res.status(200).json({
      success: true,
      data:allCategories,
      message: "All Categories fetched successfully",
    });
  } catch (error) {
    console.log("Error occured while fetching all categories");
    res.status(500).json({
      success: false,
      message: "Error occured while fetching all categories : " + error.message,
    });
  }
};

//PENDING:getCategoryPageDetails handler function
exports.getCategoryPageDetails = async (req, res) => {
  try {
    // fetch categoryId from request body
    const { categoryId } = req.body;

    // validate categoryId
    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      });
    }
    // get category details
    const categoryDetails = await Category.findById(categoryId).populate(
      "courses"
    );
    if (!categoryDetails) {
      return res.status(400).json({
        success: false,
        message: "Category not found",
      });
    }

    // get courses under the category
    const courses = await Course.find({ category: { $in: [categoryId] } })
      .populate("ratingAndReviews")
      .populate("studentsEnrolled");

    // get all courses
    const allCourses = await Course.find({});

    // get all categories
    const allCategories = await Category.find({});
  } catch (error) {
    console.log(
      "Error occured while fetching category page details : " + error.message
    );
    return res.status(500).json({
      success: false,
      message: "Error occured while fetching category page details",
    });
  }
};
