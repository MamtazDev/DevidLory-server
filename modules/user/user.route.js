const express = require("express");
const {
  registerUser,

  loginUser,
  getAllUsers,
  deleteUser,
  getUser,
  editUser,
  uploadDocuments,
  changeUserEmail,
  changeUserPassword,
} = require("./user.controller");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);
router.delete("/delete/:id", deleteUser);
router.put("/changeEmail/:id", changeUserEmail);
router.put("/changePassword/:id", changeUserPassword);
router.put("/edit/:id", editUser);
router.get("/:id", getUser);

module.exports = router;
