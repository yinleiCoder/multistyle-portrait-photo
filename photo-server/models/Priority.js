const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: { type: String },
    mark: { type: String },
    describe: { type: String },
    children: [
      {
        id: { type: String },
        name: { type: String },
        mark: { type: String },
        describe: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Priority", schema);
