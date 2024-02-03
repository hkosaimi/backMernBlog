const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: "Uncategorized",
    },
    readTime: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
