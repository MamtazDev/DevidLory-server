const { addMessage, putSubscriber, getMessagesBySender, getSubscriber, getMessageByConversationId } = require("./subscription.controller");

const router = require("express").Router();



router.post("/add", addMessage);
router.get("/current/:senderId", getSubscriber);
router.put("/current/:senderId", putSubscriber);
router.get("/:senderId/:conversationId", getMessagesBySender);
router.get("/:conversationId", getMessageByConversationId);

module.exports = router;
