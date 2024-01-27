const express = require("express");
const { Save, getFiles, DeleteFiles } = require("./audio.controller");

const router = express.Router();

//multer------------------------------------------------------------
// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, `${process.cwd()}/files/audios`);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     cb(null, uniqueSuffix + file.originalname);
//   },
// });

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
      cb(null, `audios/${uniqueSuffix}-${file.originalname}`);
    },
  }),
});

// const upload = multer({ storage: storage });

router.post("/upload-files", uploadS3.single("audioFileName"), Save);
router.get("/get-files", getFiles);
router.delete("/fileDelete/:id", DeleteFiles);

module.exports = router;
