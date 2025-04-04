const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || // best way to fetch token
      req.body?.token ||
      req.header("Authentication")?.split(" ")[1];

    // validation of token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token Missing!",
      });
    }

    // verification of token
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      //attaching user data with request
      req.user = payload;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token Invalid OR Expired!",
      });
    }
    next();
  } catch (error) {
    console.log("Error while validitaing the token : " + error);
    return res.status(401).json({
      success: false,
      message: "Error while validitaing the token",
    });
  }
};
