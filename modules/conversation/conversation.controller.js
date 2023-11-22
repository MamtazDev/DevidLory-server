const Conversation = require("./conversation.model");

const addConversationBySenderReciver = async (req, res) => {
  try {
    // const { senderId, reciverId } = req.body;
    // const newConversation = new Conversation({
    //   members: [senderId, reciverId],
    // });

    const { senderId } = req.body;
    const newConversation = new Conversation({
      members: [senderId, "655c34b3c851135cf47e71b7"],
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
    const { firstUserId } = req.params;
    const conversation = await Conversation.findOne({
      members: { $all: [firstUserId, "655c34b3c851135cf47e71b7"] },
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
