const mongoose = require("mongoose");
const Blog = require("../model/blog.model");

//get All articles
const getArticles = async (req, res) => {
  const articles = await Blog.find().sort({ createdAt: -1 });
  res.json(articles);
};

//get Article
const getArticle = async (req, res) => {
  const { id } = req.params;
  const article = await Blog.findById(id);
  res.json(article);
};

//delete article
const deleteArticle = async (req, res) => {
  const { id } = req.params;
  const deleteArticle = await Blog.findOneAndDelete({ _id: id });
  res.status(200).json(deleteArticle);
};
//create a new article
const createArticle = async (req, res) => {
  const { title, content, author, tags } = req.body;
  const minutes = content.split(" ").length / 200;

  const readTime = Math.ceil(minutes);
  try {
    const newArticle = await Blog.create({ title, content, author, tags, readTime });

    res.json(newArticle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getArticles, createArticle, getArticle, deleteArticle };
