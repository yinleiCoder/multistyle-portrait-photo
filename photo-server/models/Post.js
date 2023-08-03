const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  images: [
    {
      type: String,
    },
  ],
  // userId: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'}
});

module.exports = mongoose.model("Post", schema);
