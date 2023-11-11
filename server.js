const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 8000;

const usersRoutes = require("./modules/user/user.route");
const bookmarksRoutes = require("./modules/bookmarks/bookmarks.route");
const highlightsRoutes = require("./modules/highlights/highlights.route");
const notesRoutes = require("./modules/notes/notes.route");
const conversationRoutes = require("./modules/conversation/conversation.route");
const messagesRoutes = require("./modules/messages/message.route");

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

app.get("/", (req, res) => {
  res.send("Server is runnig");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
