const mongoose = require("mongoose");
const User = require("../user/user.model");

const notesSchema = new mongoose.Schema(
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

const Notes = mongoose.model("Notes", notesSchema);

module.exports = Notes;
