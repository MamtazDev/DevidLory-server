const express = require("express");
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
} = require("./user.controller");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);
router.get("/sendOtp/:email", sendOTPToEmail);
router.delete("/delete/:id", deleteUser);
router.put("/changeEmail/:id", changeUserEmail);
router.put("/changePassword/:email", changeUserPassword);
router.put("/subscription/:id", updateSubscriptionStatus);
router.put("/updateBuffer/:id",updateUserBuffer)
router.put("/edit/:id", editUser);
router.get("/:id", getUser);

module.exports = router;
