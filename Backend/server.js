const express = require("express");
const dbConnect = require("./Configurations/database");
const router = require("./Routes/User");
const cookieParser = require("cookie-parser");
const cloudinaryConfig = require("./Configurations/cloudinary");
const fileUpload = require("express-fileupload");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 4000; // Use PORT for the server

// request body json data parser
app.use(express.json());
// cookie data parser
app.use(cookieParser());
// express-fileupload to recieve files from client
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// mapping of routes with app
app.use("/api/v1", router);
// server starting
app.listen(port, () => {
  console.log(`server is running on port ${port}...`);
});

// database connection
dbConnect();

// cloudinary connection
cloudinaryConfig();
