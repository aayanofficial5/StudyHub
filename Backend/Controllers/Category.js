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

    // create entry in db

    const categoryDetails = await Category.create({ name, description });

    console.log(categoryDetails);

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

exports.getAllCategories = async (req,res)=>{
  try{
    // fetch all tags from DB
    const allCategories = await Category.find({},{name:true,description:true});

    return res.status(200).json({
      success:true,
      allCategories,
      message:"All Categories fetched successfully"
    })
  }catch(error){
    console.log("Error occured while fetching all categories");
    res.status(500).json({
      success: false,
      message: "Error occured while fetching all categories : " + error.message,
    });
  }
}