const express = require("express");
const multer = require("multer");

const {
  registerUser,

  loginUser,
  getAllUsers,
  deleteUser,
  getUser,
  editUser,
  changeUserEmail,
  changeUserPassword,
  sendOTPToEmail,
  updateSubscriptionStatus,
  updateUserBuffer,
  subscriptionSuccssMessage,
} = require("./user.controller");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);
router.post("/sendSubscriptionMessage", subscriptionSuccssMessage);
router.get("/sendOtp/:email", sendOTPToEmail);
router.delete("/delete/:id", deleteUser);
router.put("/changeEmail/:id", changeUserEmail);
router.put("/changePassword/:email", changeUserPassword);
router.put("/subscription/:id", updateSubscriptionStatus);

// app.post('/upload', upload.single('file'), (req, res) => {
//   const pdfBuffer = req.file.buffer; // Access the uploaded file buffer

//   console.log("pdfBuffer", pdfBuffer)

//   // Here you can perform any additional processing or save the file as needed

//   // Send a response back to the client
//   res.status(200).json({ message: 'File uploaded successfully' });
// });
router.put("/updateBuffer/:id", upload.single("file"), updateUserBuffer);
router.put("/edit/:id", editUser);
router.get("/:id", getUser);

module.exports = router;
