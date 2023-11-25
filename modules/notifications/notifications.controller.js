const Notifications = require("./notifications.model");

const createNotifications = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    const newNotifications = new Notifications({
      title,
      content,
      userId,
    });

    const notifications = await newNotifications.save();

    res.status(200).send({
      message: "Notifications added successfully.",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const getSingleNotifications = async (req, res) => {
  try {
    const { NotificationsId } = req.params;

    const Notifications = await Notifications.findById(NotificationsId);

    res.status(200).send(Notifications);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const deleteSingleNotifications = async (req, res) => {
  try {
    const { NotificationsId } = req.params;
    await Notifications.findOneAndDelete({ _id: NotificationsId })
      .exec()
      .then((result) => {
        res.status(200).send({
          message: `${result.title} is successfully removed!`,
          status: 200,
        });
      })
      .catch((err) => {
        res.send({
          message: err.message,
        });
      });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const getAllNotifications = async (req, res) => {
  try {
    const allNotifications = await Notifications.find({});
    res.status(200).send(allNotifications);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const getNotificationsByUser = async (req, res) => {
  try {
    const { userId } = req.body;

    const userNotifications = await Notifications.find({ userId: userId });

    res.status(200).send(userNotifications);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = {
  createNotifications,
  getNotificationsByUser,
};
