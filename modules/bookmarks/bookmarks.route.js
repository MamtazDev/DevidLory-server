const express = require("express");
const { createBookmarks } = require("./bookmarks.controller");

const router = express.Router();

router.post("/add", createBookmarks);

module.exports = router;
