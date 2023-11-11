const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const usersRoutes = require("./modules/user/user.route");
const bookmarksRoutes = require("./modules/bookmarks/bookmarks.route");
const highlightsRoutes = require("./modules/highlights/highlights.route");
const notesRoutes = require("./modules/notes/notes.route");

// swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require("swagger-jsdoc");


//port
const PORT = process.env.PORT || 8000;

const options = {
  definition: {
    info: {
      title: 'Christianity Books API',
      version: '1.0.0',
    },
  },
  apis: ['./modules/user/user.route*.js'], // files containing annotations as above
};

const ChristianityAPIdocs = swaggerJSDoc(options);
console.log("ChristianityAPIdocs", ChristianityAPIdocs)









const app = express();
app.use(cors());
app.use(express.json());


app.use("/api-docs", swaggerUi.serve)
app.get("/api-docs", swaggerUi.setup(ChristianityAPIdocs));

connectDB();

app.use("/api/users", usersRoutes);
app.use("/api/bookmarks", bookmarksRoutes);
app.use("/api/highlights", highlightsRoutes);
app.use("/api/notes", notesRoutes);

app.get("/", (req, res) => {
  res.send("Christianity book's Server is runnig");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
