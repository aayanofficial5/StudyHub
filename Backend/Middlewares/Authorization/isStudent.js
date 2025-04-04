exports.isStudent = async (req, res, next) => {
  try {
    const user = req.user;
    // verifying user's account type
    if (user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is a Protected Route for Students",
      });
    }
    next();
  } catch (error) {
    console.log("Error in verifying user's account type : " + error);
    res.status(401).json({
      success: false,
      message: "Error in verifying user's account type",
    });
  }
};
