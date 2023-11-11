const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Bookmarks = mongoose.model("Bookmarks", bookmarkSchema);

module.exports = Bookmarks;
