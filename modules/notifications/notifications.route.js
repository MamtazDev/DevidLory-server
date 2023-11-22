const express = require("express");
const {
  createNotifications,
  getNotificationsByUser,
} = require("./notifications.controller");

const router = express.Router();

router.post("/add", createNotifications);
router.post("/userNotifications", getNotificationsByUser);

module.exports = router;
