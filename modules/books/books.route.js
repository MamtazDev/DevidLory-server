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
// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, `${process.cwd()}/files`);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     cb(null, uniqueSuffix + file.originalname);
//   },
// });
// const upload = multer({ storage: storage });

const { S3Client } = require("@aws-sdk/client-s3");

const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new S3Client({
  credentials: {
    secretAccessKey: process.env.AWS_SECRET_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    region: process.env.AWS_REGION,
  },
});

const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKETNAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  }),
});

router.post(
  "/upload-files",
  uploadS3.fields([
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
  uploadS3.fields([
    { name: "file", maxCount: 1 },
    { name: "coverPic", maxCount: 1 },
  ]),
  editPdf
);
module.exports = router;
