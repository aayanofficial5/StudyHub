// const File = require("../Models/File");

// const cloudinary = require("cloudinary").v2;

// // exports.localFileUpload = async (req, res) => {
// //   try {
// //     const file = req.files.file;
// //     // set a path
// //     const path =
// //       __dirname + "/files/" + Date.now() + "." + file.name.split(".").at(-1);

// //     // move the file to specified path
// //     await file.mv(path, (err) => {
// //       if (err) console.log(err);
// //     });

// //     return res.status(200).json({
// //       success: true,
// //       message: "File Uploaded Successfully",
// //       path: path,
// //     });
// //   } catch (error) {
// //     console.log("Error occurred while moving file to local path");
// //     return res.status(500).json({
// //       success: true,
// //       message: "File Upload Failed!",
// //     });
// //   }
// // };

// exports.cloudFileUpload = async (req, res) => {
//   try {
//     // fetch file, body data and user from req
//     const { file } = req.files;
//     const { fileName, tags, quality } = req.body;
//     const user = req.user;
//     // validation of file
//     if (!file) {
//       return res.status(400).json({
//         success: true,
//         message: "File missing, please upload file again",
//       });
//     }

//     // check for supported types
//     const format = file.name.split(".").pop();
//     const image = ["jpeg", "jpg", "png", "webp", "heic"];
//     const video = ["webm", "mp4", "mov"];
//     let fileType =
//       (image.includes(format) ? "image" : null) ||
//       (video.includes(format) ? "video" : null);

//     if (!fileType) {
//       return res.status(400).json({
//         success: true,
//         message: "File type not supported",
//       });
//     }
//     console.log(file);
//     // check for size
//     if (file.size > 1024 * 1024 * 50) {
//       return res.status(400).json({
//         success: true,
//         message: "File size is too large, please upload file less than 50mb",
//       });
//     }

//     // check for quality
//     if (quality < 1 || quality > 100) {
//       return res.status(400).json({
//         success: true,
//         message: "File quality could not be less than 1 and greater than 100",
//       });
//     }
//     // uploade file to cloudinary
//     const cloudResponse = await cloudinary.uploader.upload(file.tempFilePath, {
//       folder: user.accountType,
//       resource_type: fileType,
//       quality: quality,
//     });

//     // save the file entry in DB
//     const fileData = {
//       fileName,
//       email: user.email,
//       uploadedBy: user.firstName,
//       accountType: user.accountType,
//       fileUrl: cloudResponse.secure_url,
//       fileType,
//       quality: quality + "%",
//     };
//     if (tags) fileData.tags = tags;

//     const dbResponse = await File.create(fileData);

//     return res.status(200).json({
//       success: true,
//       file: fileData,
//       message: "File Uploaded to cloud successfully",
//     });
//   } catch (error) {
//     console.log("Error occurred while uploading file to cloud : " + error);
//     return res.status(500).json({
//       success: false,
//       message: "Error occurred while uploading file to cloud",
//     });
//   }
// };
