const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: { type: String },
    describe: { type: String },
    priorities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Priority" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Role", schema);
