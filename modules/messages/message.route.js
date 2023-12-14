const { addMessage, putMessageSeen, getMessagesBySender, getMessageByConversationId } = require("./message.controller");

const router = require("express").Router();


router.post("/add", addMessage);
router.put("/seen/:senderId/:conversationId", putMessageSeen);
router.get("/:senderId/:conversationId", getMessagesBySender);
router.get("/:conversationId", getMessageByConversationId);

module.exports = router;
