const mongoose = require("mongoose");
const User = require("../user/user.model");

const highlightsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      ref: User,
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const Highlights = mongoose.model("Highlights", highlightsSchema);

module.exports = Highlights;
