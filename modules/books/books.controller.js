const { sendEmail } = require("../../utils/auth");
const Book = require("./books.model");
const User = require("../user/user.model");
const Audio = require("../audios/audio.model");
const fs = require("fs");
const Request = require("./request.model");

const SavePdf = async (req, res) => {
  // console.log(req.files);
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const fileName = req?.files["file"][0]?.filename;
  const coverPic = req?.files["coverPic"][0]?.filename;
  try {
    await Book.create({
      title: title,
      pdf: fileName,
      price,
      coverPic,
      description,
    });
    return res.send({ status: "ok" });
  } catch (error) {
    res.status(200).json({ status: error });
  }
};

const editPdf = async (req, res) => {
  try {
    const isExist = await Book.findOne({ _id: req.params.id });

    if (isExist) {
      const { ...info } = req.body;

      let editInfo = {
        ...info,
      };

      if (req.files && req.files.file && req.files.file[0]?.filename) {
        editInfo.pdf = req.files.file[0].filename;
      }

      if (req.files && req.files.coverPic && req.files.coverPic[0]?.filename) {
        editInfo.coverPic = req.files.coverPic[0].filename;
      }

      const result = await Book.findByIdAndUpdate(
        { _id: req.params.id },
        editInfo,
        {
          new: true,
        }
      );

      return res.send({ status: "ok" });
    } else {
      res.status(201).json({
        success: false,
        message: "Book not found",
      });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
const PurchaseBook = async (req, res) => {
  const book_id = req.body.book_id;
  const user_id = req.body.user_id;

  try {
    const result = await User.findByIdAndUpdate(
      { _id: user_id },
      {
        $push: { purchased_books: book_id },
      },
      {
        new: true,
      }
    ).populate("purchased_books");
    return res
      .status(200)
      .send({ status: "ok", msg: "Successfully Purchased", data: result });
  } catch (error) {
    return res.status(200).json({ status: error });
  }
};

const getFiles = async (req, res) => {
  try {
    Book.find({}).then((data) => {
      return res.send({ status: "ok", data: data });
    });
  } catch (error) {
    console.log(error);
  }
};

const getFilesByID = async (req, res) => {
  try {
    Book.find({ _id: req.params.id })
      .populate({ path: "audios", options: { sort: { pageIndex: 1 } } })
      .then((data) => {
        return res.send({ status: "ok", data: data });
      });
  } catch (error) {
    console.log(error);
  }
};

const DeleteFiles = async (req, res) => {
  const { id } = req.params;

  try {
    User.find({}).then((data) => {
      data.map((item) => {
        if (item?.purchased_books?.includes(id)) {
          return res.status(200).send({
            status: "not_ok",
            msg: "Sorry, you cannot delete the book as it has been purchased by someone.",
          });
        }
      });
    });

    const audioWithBoook = await Audio.find({ book_id: id });

    if (audioWithBoook.length > 0) {
      return res.status(200).send({
        status: "not_ok",
        msg: "Please delete its related audio then delete books.",
      });
    }

    const book = await Book.findById(req.params.id);

    if (book) {
      const FilePathCover = `${process.cwd()}/files/${book.coverPic}`;
      fs.unlink(FilePathCover, (err) => {
        if (err) {
          console.error(`Error deleting file: ${err}`);
          return;
        }
        console.log(`File ${filePath} has been deleted.`);
      });

      const filePath = `${process.cwd()}/files/${book.pdf}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file: ${err}`);
          return;
        }
        console.log(`File ${filePath} has been deleted.`);
      });
    }

    await Book.deleteOne({ _id: id });
    return res.status(200).send({ status: "ok" });
  } catch (error) {
    console.error(error);
    res.status(200).json({ error: "Unable to delete comment" });
  }
};

const sendMailToAuthorForBookHardCopy = async (req, res) => {
  try {
    const { book_id, user_id, paymentId } = req.body;
    const admin = await User.findOne({ role: "admin" });
    const user = await User.find({ _id: user_id });
    const book = await Book.find({ _id: book_id });

    let message = `Hi ${admin.fullName}, I want the Full Hard copy of this ${book[0].title} book !`;

    const data = {
      email: user[0]?.email,
      name: user[0]?.fullName,
      phoneNumber: user[0]?.phoneNumber,
      country: user[0]?.country,
      message,
      admin: admin?.email,
    };

    const newRequest = new Request({
      user: user_id,
      book: book_id,
      paymentId: paymentId,
    });
    const gg = await newRequest.save();
    await sendEmail(data);

    res.status(200).send({
      message: "Send mail to author successfully!",
      status: 200,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getBookInfoById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.send(book);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getUserRequest = async (req, res) => {
  try {
    const userRequests = await Request.find({ user: req.params.id }).populate(
      "book"
    );
    res.send(userRequests);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  SavePdf,
  getFiles,
  DeleteFiles,
  getFilesByID,
  PurchaseBook,
  sendMailToAuthorForBookHardCopy,
  editPdf,
  getBookInfoById,
  getUserRequest,
};
