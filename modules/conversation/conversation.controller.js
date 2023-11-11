const Conversation = require("./conversation.model");

const addConversationBySenderReciver = async (req, res) => {
  try {
    const { senderId, reciverId } = req.body;
    const newConversation = new Conversation({
      members: [senderId, reciverId],
    });

    const saveConversation = await newConversation.save();
    res.status(200).send(saveConversation);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getConversationByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const conversation = await Conversation.find({
      members: { $in: [userId] },
    });
    res.status(200).send(conversation);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getConversationOfTwoUsers = async (req, res) => {
  try {
    const { firstUserId, secondUserId } = req.params;
    const conversation = await Conversation.findOne({
      members: { $all: [firstUserId, secondUserId] },
    });
    res.status(200).send(conversation);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  addConversationBySenderReciver,
  getConversationByUser,
  getConversationOfTwoUsers,
};
