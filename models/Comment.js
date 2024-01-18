const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/blogapp");

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("comment", commentSchema);
