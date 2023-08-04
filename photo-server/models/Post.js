const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
    images: [
      {
        type: String,
      },
    ],
    owner: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true }, // 帖子的发布者
    voteCount: { type: Number, required: true, default: 0 }, // 帖子被赞过的数
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", schema);
