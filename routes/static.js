const express = require("express");
const Blog = require("../models/Blog");
const router = express.Router();

router.get("/", async (req, res) => {
  const allBlog = await Blog.find({});
  res.render("Home", {
    user: req.user,
    blogs: allBlog,
  });
});

module.exports = router;
