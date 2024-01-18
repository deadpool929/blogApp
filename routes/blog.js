const express = require("express");
const Blog = require("../models/Blog");
const Comment = require("../models/Comment");
const {
  handleGetBlogHome,
  handleBlogCreation,
  handleComment,
} = require("../controllers/blog");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", handleGetBlogHome);
router.get("/:id", async (req, res) => {
  const blogs = await Blog.find({ _id: req.params.id }).populate("createdBy");
  const comment = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy"
  );

  res.render("Blogs", { blog: blogs, user: req.user, comment: comment });
});
router.post("/addBlog", upload.single("coverImageURL"), handleBlogCreation);
router.post("/comment/:blogId", handleComment);

module.exports = router;
