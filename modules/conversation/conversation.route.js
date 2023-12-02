const express = require("express");
const {
  addConversationBySenderReciver,
  getConversationOfTwoUsers,
  getConversationByUser,
  sendMailToAuthor,
} = require("./conversation.controller");

const router = express.Router();

router.post("/add", addConversationBySenderReciver);
router.post("/sendEmail",sendMailToAuthor)
router.get("/users/:firstUserId", getConversationOfTwoUsers);
router.get("/:userId", getConversationByUser);

module.exports = router;
