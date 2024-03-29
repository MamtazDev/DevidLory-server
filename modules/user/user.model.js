const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: false,
      enum: ["user", "admin"],
      default: "user",
    },
    image: {
      type: String,
      required: false,
      default:
        "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
    },
    userName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    isSubscribed: {
      type: Boolean,
      default: false,
      required: false,
    },
    purchased_books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
