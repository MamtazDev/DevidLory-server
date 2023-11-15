const express = require("express");
const {
  registerUser,
  emailVirification,
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
router.get("/verify/:email", emailVirification);


/**
 * @swagger
 * /api/users:
 *    get:
 *      description: get all users
 *      responses:
 *        200:
 *          description: success
 * 
 */


/**
 * @swagger
 * /api/users:
 *    post:
 *      description: get all users
 *      responses:
 *        200:
 *          description: success
 * 
 */



module.exports = router;
