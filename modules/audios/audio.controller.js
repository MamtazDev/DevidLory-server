const Audio = require("./audio.model");
const Book = require("../books/books.model");
const fs = require("fs");

const Save = async (req, res) => {
  const bookOutlineName = req.body.bookOutlineName;
  const audioFileName = req.file.filename;
  const pageIndex = req.body.pageIndex;
  const book_id = req.body.book_id;

  try {
    let audioData = await Audio.create({
      audioFileName: audioFileName,
      bookOutlineName: bookOutlineName,
      pageIndex: pageIndex,
      book_id: book_id,
    });
    await Book.findByIdAndUpdate(
      { _id: book_id },
      {
        $push: { audios: audioData._id },
      }
    );
    return res.status(200).send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
};

const getFiles = async (req, res) => {
  try {
    Audio.find({}).then((data) => {
      return res.status(200).send({ status: "ok", data: data });
    });
  } catch (error) {
    console.log(error);
  }
};

const DeleteFiles = async (req, res) => {
  const { id } = req.params;
  try {
    let audio;
    if (id) audio = await Audio.findById(id);

    if (audio) {
      const filePath = `${process.cwd()}/files/audios/${audio.audioFileName}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file: ${err}`);
          return;
        }
        console.log(`File ${filePath} has been deleted.`);
      });
    }

    await Book.findByIdAndUpdate(
      { _id: audio.book_id },
      {
        $pull: { audios: audio._id },
      }
    );

    await Audio.deleteOne({ _id: id });
    return res.status(200).send({ status: "ok" });
  } catch (error) {
    console.error(error);
    res.status(200).json({ error: "Unable to delete comment" });
  }
};

module.exports = {
  Save,
  getFiles,
  DeleteFiles,
};
