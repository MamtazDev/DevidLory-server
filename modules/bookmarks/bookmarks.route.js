const express = require("express");
const {
  createBookmarks,
  getSingleBookmarks,
  deleteSingleBookmarks,
} = require("./bookmarks.controller");

const router = express.Router();

router.post("/add", createBookmarks);
router.get("/:bookmarksId", getSingleBookmarks);
router.delete("/delete/:bookmarksId", deleteSingleBookmarks);

module.exports = router;
