const express = require("express");
const {
  addConversationBySenderReciver,
  getConversationOfTwoUsers,
} = require("./conversation.controller");

const router = express.Router();

router.post("/add", addConversationBySenderReciver);
router.get("/users/:firstUserId/:secondUserId", getConversationOfTwoUsers);

module.exports = router;
