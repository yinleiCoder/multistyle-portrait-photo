const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    username: { type: String },
    password: {
      type: String,
      select: false,
      set(val) {
        return require("bcrypt").hashSync(val, 10);
      },
    },
    avatar: { type: String },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
      required: true,
    },
    headline: { type: String, select: false },
    social_link: { type: String, select: false },
    location: { type: String, select: false },
    following: {
      // 关注
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      select: false,
    },
    likingPosts: {
      // 赞过的帖子
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
      select: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", schema);
