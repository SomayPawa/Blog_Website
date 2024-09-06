// first insert ke liyee schema

const mongoose = require("mongoose");
const { Schema } = mongoose;

// Corrected schema reference
const blogSchema = new Schema({
  title: String,
  content: String,
  tags: String
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;


