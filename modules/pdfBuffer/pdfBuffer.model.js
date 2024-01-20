const mongoose = require("mongoose");

const PDFbufferSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    book_id: {
      type: String,
      required: true,
    },
    pdfBuffer: {
      type: Object,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const PDFbuffer = mongoose.model("PDFbuffer", PDFbufferSchema);

module.exports = PDFbuffer;
