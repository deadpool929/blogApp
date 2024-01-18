const Blog = require("../models/Blog");
const Comment = require("../models/Comment");
const handleBlogCreation = async (req, res) => {
  const body = req.body;
  const blog = await Blog.create({
    title: body.title,
    body: body.body,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${req.file.filename}`,
  });
  return res.redirect(`/blog/${blog._id}`);
};

const handleComment = async (req, res) => {
  await Comment.create({
    comment: req.body.comment,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
};

const handleGetBlogHome = (req, res) => {
  res.render("AddBlog", { user: req.user });
};

module.exports = {
  handleBlogCreation,
  handleGetBlogHome,
  handleComment,
};
