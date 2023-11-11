const Bookmarks = require("./bookmarks.model");

const createBookmarks = async (req, res) => {
  try {
    const { title, content } = req.body;

    const newBookmarks = new Bookmarks({
      title,
      content,
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

// const getSingleBookmarks = async(req,res)=>

module.exports = {
  createBookmarks,
};
