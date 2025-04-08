const RatingAndReview = require("../Models/RatingAndReview");
const Course = require("../Models/Course");
const User = require("../Models/User");

// createRatingAndReview handler function
exports.createRatingAndReview = async (req, res) => {
  try {
    // get courseId from request body and userId from request
    const {courseId,rating,review} = req.body;
    const userId = req.user.id;
    // validate courseId
    if(!courseId){
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }
    
    // check if user is enrolled in the course
    const courseDetails = await Course.findOne({_id:courseId});

    if(!courseDetails.studentsEnrolled.includes(userId)){
      return res.status(400).json({
        success: false,
        message: "You are not enrolled in this course",
      });
    }

    // check if user has already rated and reviewed the course
    const alreadyRated = await RatingAndReview.findOne({user:userId,course:courseId});
    if(alreadyRated){
      return res.status(400).json({
        success: false,
        message: "You have already rated and reviewed this course",
      });
    }

    // create rating and review
    const ratingAndReview = await RatingAndReview.create({user:userId,course:courseId,rating,review});

    // update course details
    await Course.findByIdAndUpdate(courseId,{
      $push:{ratingAndReviews:ratingAndReview._id}, 
    });

    // return response
    return res.status(200).json({
      success: true,
      message: "Rating and review created successfully",
    });
    
  } catch (error) {
    console.log("Error occured while creating rating and review : " + error.message);
    return res.status(500).json({
      success: false,
      message: "Error occured while creating rating and review",
    });
  }
};

// getAverageRatingAndReview handler function
exports.getAverageRatingAndReview = async (req, res) => {
  try {
    const  {courseId} = req.body;

    // validate courseId
    if(!courseId){
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    // get average rating and review
    const averageRatingAndReview = await RatingAndReview.aggregate([
      {$match:{course:courseId}},
      {$group:{_id:null,averageRating:{$avg:"$rating"}}},
    ]);

    if(!averageRatingAndReview.length){
      return res.status(400).json({
        success: false,
        message: "No rating and review found",
      });
    }

    // return response
    return res.status(200).json({
      success: true,
      averageRating: averageRatingAndReview[0].averageRating,
      message: "Average rating and review fetched successfully",
    });
  } catch (error) {
    console.log("Error occured while fetching average rating and review : " + error.message);
    return res.status(500).json({
      success: false,
      message: "Error occured while fetching average rating and review",
    });
  }
};

// getAllRatingAndReview handler function
exports.getAllRatingAndReview = async (req, res) => {
  try {

    // get all rating and review
    const ratingAndReview = await RatingAndReview.find({})
    .sort({rating:-1})
    .populate({path:"user",select:"firstName lastName email image"})
    .populate({path:"course",select:"courseName"});

    // return response
    return res.status(200).json({
      success: true,
      ratingAndReview,
      message: "All rating and review fetched successfully",
    });
    
  } catch (error) {
    console.log("Error occured while fetching all rating and review : " + error.message);
    return res.status(500).json({
      success: false,
      message: "Error occured while fetching all rating and review",
    });
  }
};
