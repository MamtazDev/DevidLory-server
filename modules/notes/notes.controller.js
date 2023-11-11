const Notes = require("./notes.model");

const createNotes = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    const newNotes = new Notes({
      title,
      content,
      user: userId,
    });

    const notes = await newNotes.save();

    res.status(200).send({
      message: "Notes added successfully.",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const getSingleNotes = async (req, res) => {
  try {
    const { notesId } = req.params;

    const notes = await Notes.findById(notesId);

    res.status(200).send(notes);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const deleteSingleNotes = async (req, res) => {
  try {
    const { notesId } = req.params;
    await Notes.findOneAndDelete({ _id: notesId })
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

const getAllNotes = async (req, res) => {
  try {
    const allNotes = await Notes.find({});
    res.status(200).send(allNotes);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const getNotesByUser = async (req, res) => {
  try {
    const { userId } = req.body;

    const userNotes = await Notes.find({ user: userId });

    res.status(200).send(userNotes);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = {
  createNotes,
  getSingleNotes,
  deleteSingleNotes,
  getAllNotes,
  getNotesByUser,
};
