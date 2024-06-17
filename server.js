const express = require("express");
require("dotenv").config();
const app = express();
const userRoutes = require("./route/user.route");
const blogRoutes = require("./route/blog.route");
const mongoose = require("mongoose");
const cors = require("cors");
//middlewares
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.get("/", (req, res) => {
  res.send("Welcome to backend");
});
// Middleware to allow all origins
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
app.use(cors());

//routes
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Connecting to DB & listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  });
