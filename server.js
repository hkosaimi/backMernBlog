const express = require("express");
require("dotenv").config();
const app = express();
const userRoutes = require("./route/user.route");
const blogRoutes = require("./route/blog.route");
const cors = require("cors");
//middlewares
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);


app.use(cors({
  origin: "https://frontend-mern-blog-beta.vercel.app/#/"
}));
const mongoose = require("mongoose");

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
