const express = require("express");
const {
  getArticles,
  createArticle,
  getArticle,
  deleteArticle,
} = require("../controller/blog.controller");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const isAdmin = require("../middleware/isAdmin");

//get all articles
router.get("/articles", getArticles);

//get single articles
router.get("/articles/:id", getArticle);

//require authentication
router.use(requireAuth);

//require admin
router.use(isAdmin);

//post article
router.post("/articles", createArticle);

//delete article
router.delete("/articles/:id", deleteArticle);

module.exports = router;
