const Message = require("./subscription.model");

const addMessage = async (req, res) => {
  try {
    const newMessage = new Message(req.body);

    const saveMessage = await newMessage.save();
    res.status(200).send(saveMessage);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getMessageByConversationId = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).send(messages);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getMessagesBySender = async (req, res) => {
  try {
    const { senderId, conversationId } = req.params;

    const messages = await Message.find({
      conversationId: conversationId,
      sender: senderId,
      isSeen: false,
    });
    res.status(200).send(messages);
  } catch (error) {
    res.status(500).send(error);
  }
};

const putSubscriber = async (req, res) => {
  const { senderId, conversationId } = req.params;

  try {
    const messages = await Message.updateMany(
      { sender: senderId, conversationId: conversationId },
      { $set: { isSeen: true } }
    );
    res.status(200).send({
      message: "All message seen",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

const getSubscriber = async (req, res) => {
  const { senderId, conversationId } = req.params;

  try {
    const messages = await Message.updateMany(
      { sender: senderId, conversationId: conversationId },
      { $set: { isSeen: true } }
    );
    res.status(200).send({
      message: "All message seen",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  addMessage,
  getMessagesBySender,
  putSubscriber,
  getSubscriber,
  getMessageByConversationId,
};
