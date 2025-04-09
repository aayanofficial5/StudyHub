// const Course = require("../Models/Course");
// const Tag = require("../Models/Tag");
// const User = require("../Models/User");
// const { fileUploader } = require("../utils/fileUploader");
// const Category = require("../Models/Category");

// // createCourse Handler Function
// exports.createCourse = async (req, res) => {
//   try {
//     // fetch data from request body
//     const {
//       courseName,
//       courseDescription,
//       whatYouWillLearn,
//       price,
//       tags,
//       category,
//     } = req.body;

//     // fetch user from request
//     const user = req.user;

//     // fetch image from req.files
//     const thumbnail = req.files?.thumbnailImage;

//     // validation
//     if (
//       !courseName ||
//       !courseDescription ||
//       !whatYouWillLearn ||
//       !price ||
//       !category ||
//       !tags ||
//       !thumbnail
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     // check given tags are valid or not
//     const existingTags = await Tag.find({ name: { $in: tags } });
//     const existingTagNames = existingTags.map((tag) => tag.name);
//     const missingTags = tags.filter((tag) => !existingTagNames.includes(tag));

//     // create new tags if any are missing
//     let newTags = [];
//     if (missingTags.length > 0) {
//       const createdTags = await Tag.insertMany(
//         missingTags.map((tag) => ({ name: tag }))
//       );
//       newTags = createdTags;
//     }

//     const allTags = [...existingTags, ...newTags];

//     // check given category is valid or not
//     const categoryDetails = await Category.findOne({ name: category });
//     if (!categoryDetails) {
//       return res.status(400).json({
//         success: false,
//         message: "Category Details not found",
//       });
//     }

//     // upload thumbnail to cloud
//     const thumbnailImage = await fileUploader(
//       thumbnail,
//       process.env.FOLDER_NAME
//     );

//     // create an entry of course
//     const newCourse = await Course.create({
//       courseName,
//       courseDescription,
//       instructor: user.id,
//       whatYouWillLearn,
//       price,
//       tag: allTags.map((tag) => tag._id),
//       category: categoryDetails._id,
//       thumbnail: thumbnailImage.secure_url,
//     });

//     // add this course to instructor's course list
//     await User.findByIdAndUpdate(user.id, {
//       $push: { courses: newCourse._id },
//     });

//     // update the tag schema
//     await Tag.updateMany(
//       { _id: { $in: allTags.map((tag) => tag._id) } },
//       { $push: { course: newCourse._id } }
//     );

//     // update the category schema
//     await Category.findByIdAndUpdate(categoryDetails._id, {
//       $push: { course: newCourse._id },
//     });

//     return res.status(200).json({
//       success: true,
//       data: newCourse,
//       message: "Course Created Successfully",
//     });
//   } catch (error) {
//     console.log("Error occurred while creating the course:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to create course!",
//     });
//   }
// };
