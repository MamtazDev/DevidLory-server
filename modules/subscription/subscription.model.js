const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    subscribeId: {
      type: String,
      required: true,
    },
    expireDate: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    CVC:{
      type: String,
      required: true,
    },
    planType: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Subscription = mongoose.model("subscription", subscriptionSchema);

module.exports = Subscription;
