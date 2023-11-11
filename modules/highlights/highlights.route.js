const express = require("express");
const {
  createHighlights,
  getAllHighlights,
  getHighlightsByUser,
  getSingleHighlights,
} = require("./highlights.controller");

const router = express.Router();

router.post("/add", createHighlights);
router.get("/allHighlights", getAllHighlights);
router.get("/userHighlights", getHighlightsByUser);
router.get("/:highlightsId", getSingleHighlights);
router.delete("/delete/:highlightsId", deleteSingleBookmarks);

module.exports = router;
