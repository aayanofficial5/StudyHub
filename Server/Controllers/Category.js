const Category = require("../Models/Category");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

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
    // check if name is valid
    const correctName = name
      .split(" ")
      .map((str) => str[0].toUpperCase + str.slice(1).toLowerCase)
      .join(" ");

    // check if category already exists
    const existingCategory = await Category.findOne({ correctName });
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
    const allCategories = await Category.find({});

    return res.status(200).json({
      success: true,
      data: allCategories,
      message: "All Categories fetched successfully",
    });
  } catch (error) {
    console.log("Error occured while fetching categories");
    res.status(500).json({
      success: false,
      message: "Error occured while fetching categories",
    });
  }
};

// getCategoryPageDetails handler function
exports.getCategoryPageDetails = async (req, res) => {
  try {
    let categoryName = req.params.name;
    categoryName = categoryName
      ?.split("-")
      ?.map((str) => str[0]?.toUpperCase() + str?.slice(1).toLowerCase())
      .join(" ");
    console.log(categoryName);
    const selectedCategory = await Category.findOne({ name: categoryName })
      .populate({
        path: "course",
        match: { status: "Published" },
        populate: "ratingAndReviews",
      })
      .exec();

    if (!selectedCategory) {
      console.log("Category not found.");
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    const categoryId = selectedCategory._id;
    if (selectedCategory.course.length === 0) {
      console.log("No courses found for the selected category.");
      return res.status(200).json({
        success: true,
        message: "No courses found for the selected category.",
      });
    }

    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    });
    let differentCategory = await Category.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        ._id
    )
      .populate({
        path: "course",
        match: { status: "Published" },
      })
      .exec();

    const allCategories = await Category.find()
      .populate({
        path: "course",
        match: { status: "Published" },
      })
      .exec();

    const allCourses = allCategories.flatMap((category) => category.course);
    const mostSellingCourses = allCourses
      .sort((a, b) => b.studentsEnrolled.length - a.studentsEnrolled.length)
      .slice(0, 10);

    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    });
  } catch (error) {
    console.log("Error occured while fetching catalog page details", error);
    return res.status(500).json({
      success: false,
      message: "Error occured while fetching catalog page details",
    });
  }
};
