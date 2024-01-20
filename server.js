const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 8000;

const fs = require("fs");
const path = require("path");

const multer = require("multer");

const usersRoutes = require("./modules/user/user.route");
const bookmarksRoutes = require("./modules/bookmarks/bookmarks.route");
const highlightsRoutes = require("./modules/highlights/highlights.route");
const notesRoutes = require("./modules/notes/notes.route");
const conversationRoutes = require("./modules/conversation/conversation.route");
const messagesRoutes = require("./modules/messages/message.route");
const subscriptionRoutes = require("./modules/subscription/subscription.route");
const couponRoutes = require("./modules/coupon/coupon.route");
const bookRoutes = require("./modules/books/books.route");
const audioRoutes = require("./modules/audios/audio.route");

// stripe details

const notificationRoutes = require("./modules/notifications/notifications.route");
const User = require("./modules/user/user.model");
const PDFbuffer = require("./modules/pdfBuffer/pdfBuffer.model");

const { AudiofilePath, allAudios } = require("./utils/get-file-path");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/users", usersRoutes);
app.use("/api/bookmarks", bookmarksRoutes);
app.use("/api/highlights", highlightsRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/coupon", couponRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/audios", audioRoutes);

app.use("/files", express.static("files"));
// subscription
app.use("/api/subscription", subscriptionRoutes);

app.get("/", (req, res) => {
  res.send("Server is runnig");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB limit
  },
});

// app.get("/api/get-file-path", async (req, res) => {
//   let files = await allAudios();
//   let audioFiles = JSON.parse(files);
//   res.json(audioFiles);
// });

// audio streming site
// app.get("/api/audio", async (req, res) => {
//   // get audio file
//   const { filename } = req.query;
//   let files = await AudiofilePath(filename);
//   let audioFileName = JSON.parse(files);

//   const filePath = path.join(
//     __dirname,
//     `/assets/audio-files/${audioFileName}.mp3`
//   ); // Replace with your audio file path
//   const stat = fs.statSync(filePath);
//   const fileSize = stat.size;
//   const range = req.headers.range;

//   if (range) {
//     const parts = range.replace(/bytes=/, "").split("-");
//     const start = parseInt(parts[0], 10);
//     const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
//     const chunksize = end - start + 1;
//     const file = fs.createReadStream(filePath, { start, end });
//     const head = {
//       "Content-Range": `bytes ${start}-${end}/${fileSize}`,
//       "Accept-Ranges": "bytes",
//       "Content-Length": chunksize,
//       "Content-Type": "audio/mp3",
//     };
//     res.writeHead(206, head);
//     file.pipe(res);
//   } else {
//     const head = {
//       "Content-Length": fileSize,
//       "Content-Type": "audio/mp3",
//     };
//     res.writeHead(200, head);
//     fs.createReadStream(filePath).pipe(res);
//   }
// });

app.put("/upload/:id", upload.single("file"), async (req, res) => {
  const pdfBuffer = req.file.buffer; // Access the uploaded file buffer
  const { bookId } = req.query;
  const { id } = req.params; //userId
  try {
    const existingBook = await PDFbuffer.findOne({
      user_id: id,
      book_id: bookId,
    });

    if (existingBook) {
      await PDFbuffer.updateOne(
        { user_id: id, book_id: bookId },
        { $set: { pdfBuffer: pdfBuffer } }
      );

      res.status(200).send({
        message: "User PDF updated successfully!",
        status: 200,
      });
    } else {
      const newPDFBuffer = new PDFbuffer({
        user_id: id,
        book_id: bookId,
        pdfBuffer: pdfBuffer,
      });

      await newPDFBuffer.save();

      res.status(200).send({
        message: "PDF Buffer created and saved successfully",
        status: 200,
      });
    }
  } catch (error) {
    console.error("Error updating PDF Buffer:", error);
    res.status(500).send({
      message: "Failed to update PDF Buffer",
      status: 500,
      error: error.message,
    });
  }
});
// Get book
app.get("/getbook-buffer", async (req, res) => {
  const { user_id, bookId } = req.query;

  try {
    const existingBook = await PDFbuffer.findOne({
      user_id: user_id,
      book_id: bookId,
    });
    res.status(200).send({
      message: "Got the book!",
      data: existingBook,
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching PDF Buffer:", error);
    res.status(500).send({
      message: "Failed to fetch PDF Buffer",
      status: 500,
      error: error.message,
    });
  }
});
