const mongoose = require("mongoose");

const audioSchema = new mongoose.Schema(
  {
    bookOutlineName: String,
    audioFileName: String,
    pageIndex: Number,
    book_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  },
  { timestamps: true }
);

const Audio = mongoose.model("Audio", audioSchema);

module.exports = Audio;
