const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async (retryCount = 0) => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);

    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection failed!");
    
    if (retryCount < 5) {
      console.log(`🔁 Retrying in 60 seconds... (Attempt ${retryCount + 1})`);
      setTimeout(() => {
        dbConnect(retryCount + 1);
      }, 10 * 1000);
    } else {
      console.error("❌ Max retry attempts reached. Exiting...");
      process.exit(1);
    }
  }
};

module.exports = dbConnect;

