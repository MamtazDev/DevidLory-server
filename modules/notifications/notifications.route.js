const express = require("express");
const {
  createNotifications,
  getNotificationsByUser,
  putMessageSeen,
} = require("./notifications.controller");

const router = express.Router();

router.post("/add", createNotifications);
router.post("/userNotifications", getNotificationsByUser);
router.put("/notificationStatus", putMessageSeen);

module.exports = router;
