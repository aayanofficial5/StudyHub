const cloudinary = require("cloudinary").v2;

const cloudinaryConfig = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    ai_secret: process.env.API_SECRET,
  });
  console.log("Cloudinary Configuration Successful...");
};

module.exports = cloudinaryConfig;
