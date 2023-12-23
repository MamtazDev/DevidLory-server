const express = require("express");
const { Save, getFiles, DeleteFiles } = require("./audio.controller");

const router = express.Router();

//multer------------------------------------------------------------
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${process.cwd()}/files/audios`);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/upload-files", upload.single("audioFileName"), Save);
router.get("/get-files", getFiles);
router.delete("/fileDelete/:id", DeleteFiles);

module.exports = router;
