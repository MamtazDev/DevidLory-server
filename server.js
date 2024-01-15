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
  console.log("req", req.file);
  const pdfBuffer = req.file.buffer; // Access the uploaded file buffer

  // console.log("pdfBuffer", pdfBuffer);
  const isExist = await User.findOne({ _id: req.params.id }).select(
    "-password"
  );

  // console.log("isExist:", isExist);

  if (isExist) {
    const result = await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          pdfBuffer: pdfBuffer,
        },
      }
    );

    res.status(200).send({
      message: "User PDF updated successfully!",
      user: isExist,
      status: 200,
    });
  } else {
    res.status(400).send({
      message: "User not exist!",
    });
  }

  // Here you can perform any additional processing or save the file as needed

  // Send a response back to the client
  // res.status(200).json({ message: 'File uploaded successfully' });
});

// app.post("/upload", upload.single("file"), (req, res) => {
//   const pdfBuffer = req.file.buffer; // Access the uploaded file buffer

//   console.log("pdfBuffer", pdfBuffer);

//   // Here you can perform any additional processing or save the file as needed

//   // Send a response back to the client
//   res.status(200).json({ message: "File uploaded successfully" });
// });

// 1. conversation
// 2. new update api pdf buffer add
// 3. call buffer api

// const response = await fetch(
//   "https://your-server-endpoint.com/save-pdf",
//   {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/pdf",
//     },
//     // body: pdfBuffer ? pdfBuffer: pdfData ,
//     body: pdfData ,
//   }
// );
