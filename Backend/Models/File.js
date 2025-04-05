// const mongoose = require("mongoose");
// const mailSender = require("../utils/mailSender");
// const cloudFileUploaded = require("../Templates/Mails/cloudFileUploaded");

// const fileSchema = new mongoose.Schema({
//   fileName: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   uploadedBy: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     trim: true,
//   },
//   accountType: {
//     type: String,
//     required: true,
//     enum: ["Student", "Instructor", "Admin"],
//   },
//   fileUrl: {
//     type: String,
//     required: true,
//   },
//   filetype: {
//     type: String,
//   },
//   tags: {
//     type: String,
//     default: "knowgeek images",
//   },
//   quality: {
//     type: String,
//     required: true,
//   },
// });

// fileSchema.post("save", async (doc) => {
//   try {
//     if(doc.accountType=="Admin"){
//     const mailResponse = await mailSender(
//       doc.email,
//       "File Uploaded to Cloud Successfully",
//       cloudFileUploaded(doc)
//     );
//     console.log("Email sent successfully...");
//     console.log(mailResponse);
//   }
//   } catch (err) {
//     console.log("Error occurred while sending email : " + err.message);
//   }
// });

// module.exports = mongoose.model("File", fileSchema);
