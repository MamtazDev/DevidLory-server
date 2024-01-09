const express = require("express");
const {
  SavePdf,
  getFiles,
  DeleteFiles,
  getFilesByID,
  PurchaseBook,
  sendMailToAuthorForBookHardCopy,
  editPdf,
  getBookInfoById,
  getUserRequest,
} = require("./books.controller");

const router = express.Router();

//multer------------------------------------------------------------
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${process.cwd()}/files`);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post(
  "/upload-files",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "coverPic", maxCount: 1 },
  ]),
  SavePdf
);
// router.post("/upload-files", upload.single("file"), SavePdf);
router.get("/get-files", getFiles);
router.get("/getFilesById/:id", getFilesByID);
router.get("/getUserRequest/:id", getUserRequest);

router.post("/purchase-book", PurchaseBook);
router.delete("/fileDelete/:id", DeleteFiles);
router.post("/asksHardCopy", sendMailToAuthorForBookHardCopy);
+router.get("/getBookInfo/:id", getBookInfoById);
router.patch(
  "/editBook/:id",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "coverPic", maxCount: 1 },
  ]),
  editPdf
);
module.exports = router;
