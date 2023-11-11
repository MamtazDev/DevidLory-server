const express = require("express");
const {
  createBookmarks,
  getSingleBookmarks,
  deleteSingleBookmarks,
  getAllBookmarks,
  getBookmarksByUser,
} = require("./bookmarks.controller");

const router = express.Router();

router.post("/add", createBookmarks);
router.get("/allBookmarks", getAllBookmarks);
router.get("/userBookmarks", getBookmarksByUser);
router.get("/:bookmarksId", getSingleBookmarks);
router.delete("/delete/:bookmarksId", deleteSingleBookmarks);

module.exports = router;
