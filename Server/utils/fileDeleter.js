const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const { FOLDER_NAME } = process.env;
// fileDeleter handler function

function extractPublicId(url) {
  const imageName = url.split("/").pop().split(".")[0];
  const publicId = url.split("/").at(-2) + "/" + imageName;
  console.log(publicId);
  return publicId;
}

exports.fileDeleter = async (url, type) => {
  try {
    const publicId = extractPublicId(url);

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: type,
    });
    console.log("File deleted response:", result);
  } catch (error) {
    console.log("Error occured while deleting file from cloudinary");
  }
};
