const Highlights = require("./highlights.model");

const createHighlights = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    const newHighlights = new Highlights({
      title,
      content,
      user: userId,
    });

    const highlights = await newHighlights.save();

    res.status(200).send({
      message: "Highlights added successfully.",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const getSingleHighlights = async (req, res) => {
  try {
    const { highlightsId } = req.params;

    const highlights = await Highlights.findById(highlightsId);

    res.status(200).send(highlights);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const deleteSingleHighlights = async (req, res) => {
  try {
    const { highlightsId } = req.params;
    await Highlights.findOneAndDelete({ _id: highlightsId })
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

const getAllHighlights = async (req, res) => {
  try {
    const allHighlights = await Highlights.find({});
    res.status(200).send(allHighlights);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const getHighlightsByUser = async (req, res) => {
  try {
    const { userId } = req.body;

    const userHighlights = await Highlights.find({ user: userId });

    res.status(200).send(userBookmarks);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = {
  createHighlights,
  getSingleHighlights,
  deleteSingleHighlights,
  getAllHighlights,
  getHighlightsByUser,
};
