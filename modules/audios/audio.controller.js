const Audio = require("./audio.model");
const Book = require("../books/books.model");
const fs = require("fs");

const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  credentials: {
    secretAccessKey: process.env.AWS_SECRET_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    region: process.env.AWS_REGION,
  },
});

async function deleteFileFromS3(key) {
  try {
    const deleteParams = {
      Bucket: process.env.AWS_S3_BUCKETNAME,
      Key: key,
    };

    const command = new DeleteObjectCommand(deleteParams);
    const response = await s3.send(command);

    console.log("Successfully deleted file from bucket", key);
    return response;
  } catch (err) {
    console.error("Error", err);
  }
}

const Save = async (req, res) => {
  const bookOutlineName = req.body.bookOutlineName;
  const audioFileName = req.file.key;
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
    Audio.find({})
      .sort({ pageIndex: 1 })
      .then((data) => {
        // console.log("data", data);
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
      await deleteFileFromS3(`${audio.audioFileName}`);
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
