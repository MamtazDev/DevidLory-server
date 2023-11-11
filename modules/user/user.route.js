const express = require("express");
const {
  registerUser,

  loginUser,
  getAllUsers,
  deleteUser,
  getUser,
  editUser,
  uploadDocuments,
} = require("./user.controller");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);
router.delete("/delete/:id", deleteUser);
router.put("/upload/:id", uploadDocuments);
router.put("/edit/:id", editUser);
router.get("/:id", getUser);

module.exports = router;
