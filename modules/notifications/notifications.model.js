const mongoose = require("mongoose");

const notificationsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Notifications = mongoose.model("Notifications", notificationsSchema);

module.exports = Notifications;
