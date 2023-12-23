const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    pdf: {
      type: String,
    },
    coverPic: {
      type: String,
    },
    price: {
      type: Number,
      default: 9.99,
    },
    title: String,
    audios: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Audio",
      },
    ],
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
