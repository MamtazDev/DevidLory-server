const User = require("../user/user.model");
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

    const allUserID = conversation?.map((i) =>
      i?.members?.find((j) => j !== userId)
    );

    const availableUsers = await User.find({ _id: { $in: allUserID } });

    const formatedData = conversation?.map((i) => {
      const relatedUser = availableUsers?.find((j) =>
        i.members.includes(j._id)
      );
      const data = {
        conversationId: i?._id,
        userInfo: relatedUser,
      };
      return data;
    });

    res.status(200).send(formatedData);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getConversationOfTwoUsers = async (req, res) => {
  try {
    const admin = await User.findOne({ role: "admin" });
    const { firstUserId } = req.params;
    const conversation = await Conversation.findOne({
      members: { $all: [firstUserId, `${admin?._id}`] },
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
