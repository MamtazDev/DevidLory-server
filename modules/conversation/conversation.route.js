const express = require("express");
const {
  addConversationBySenderReciver,
  getConversationOfTwoUsers,
  getConversationByUser,
} = require("./conversation.controller");

const router = express.Router();

router.post("/add", addConversationBySenderReciver);
router.get("/users/:firstUserId", getConversationOfTwoUsers);
router.get("/:userId", getConversationByUser);

module.exports = router;
