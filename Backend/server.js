const express = require("express");
const dbConnect = require("./Config/database");
const router = require("./Routes/User");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 4000; // Use PORT for the server

// request body   json data parser
app.use(express.json());

// mapping of routes with app
app.use("/api/v1", router);
// server starting
app.listen(port, () => {
  console.log(`server is running on port ${port}...`);
});

// database connection
dbConnect();
