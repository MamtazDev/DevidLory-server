const express = require("express");
const {
  createNotes,
  getAllNotes,
  getNotesByUser,
  getSingleNotes,
  deleteSingleNotes,
} = require("./notes.controller");

const router = express.Router();

router.post("/add", createNotes);
router.get("/allNotes", getAllNotes);
router.get("/userNotes", getNotesByUser);
router.get("/:notesId", getSingleNotes);
router.delete("/delete/:notesId", deleteSingleNotes);

module.exports = router;
