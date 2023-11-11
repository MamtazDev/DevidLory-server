const Bookmarks = require("./bookmarks.model");

const createBookmarks = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    const newBookmarks = new Bookmarks({
      title,
      content,
      user: userId,
    });

    const bookmark = await newBookmarks.save();

    res.status(200).send({
      message: "Bookmarks added successfully.",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const getSingleBookmarks = async (req, res) => {
  try {
    const { bookmarksId } = req.params;

    const bookmarks = await Bookmarks.findById(bookmarksId);

    res.status(200).send(bookmarks);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const deleteSingleBookmarks = async (req, res) => {
  try {
    const { bookmarksId } = req.params;
    await Bookmarks.findOneAndDelete({ _id: bookmarksId })
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

module.exports = {
  createBookmarks,
  getSingleBookmarks,
  deleteSingleBookmarks
};
