const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    content: { type: String },
    commentator: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    }, // 评论人
    postId: { type: String }, //属于那条帖子
    rootCommentId: { type: String },
    replyTo: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", schema);
