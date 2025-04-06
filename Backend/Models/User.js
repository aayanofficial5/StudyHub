const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  userName:{
    type:String,
    required:true,
    unique:true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    // unique:true,
  },
  password: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    enum: ["Admin", "Student", "Instructor"],
    required: true,
  },
  image: {
    type: String,
  },
  additionalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required:true,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  courseProgress: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseProgress",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);

// middleware to send email when user is deleted

userSchema.post('deleteOne',async (doc)=>{
  try{
    await mailSender(doc.email,"Account Deleted Successfully",accountDeleted(doc.email,doc.firstName));
  }catch(error){
    console.log("Error occurred while sending email:",error);
  }
});
