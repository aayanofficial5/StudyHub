const cloudinary = require("cloudinary").v2;

// fileDeleter handler function

exports.fileDeleter = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log("Error occured while deleting file from cloudinary");
    throw error;
  }
};
