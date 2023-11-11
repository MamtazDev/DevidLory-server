const User = require("./user.model");
const bcrcypt = require("bcryptjs");
const { generateToken, sendVerificationEmail } = require("../../utils/auth");

const registerUser = async (req, res) => {
  try {
    const isExist = await User.findOne({ email: req.body.email });
    if (isExist) {
      return res.status(403).send({
        message: `${req.body.email} is already Exist!`,
        status: 403,
      });
    } else {
      const newUser = new User({
        role: req.body.role,
        email: req.body.email,
        userName: req.body.userName,
        password: bcrcypt.hashSync(req.body.password),
      });
      const user = await newUser.save();
      const accessTOken = await generateToken(user);

      res.status(200).send({
        message: "User Created successfully",
        user,
        accessTOken,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user && bcrcypt.compareSync(req.body.password, user.password)) {
      const accessTOken = await generateToken(user);
      return res.send({
        message: "Logged in successfully",
        status: 200,
        user,
        accessTOken,
      });
    } else {
      res.status(401).send({
        message: "Invalid user or password",
        status: 401,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const editUser = async (req, res) => {
  const { image, userName, phoneNumber, country } = req.body;
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.image = image;
      user.userName = userName;
      user.phoneNumber = phoneNumber;
      user.country = country;

      await user.save();

      res.status(200).send({
        data: user,
        message: "User updated successfully",
        status: 200,
      });
    } else {
      res.status(401).send({
        message: "There is no such user",
        status: 400,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      data: users,
      status: 200,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.params.id })
      .exec()
      .then((result) => {
        res.status(200).send({
          message: `${result.name} is successfully removed!`,
          status: 200,
        });
      })
      .catch((err) => {
        res.send({
          message: err.message,
        });
      });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.send(user);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const changeUserEmail = async (req, res) => {
  try {
    const isExist = await User.findOne({ _id: req.params.id });

    if (isExist) {
      const result = await User.updateOne(
        { _id: req.params.id },
        {
          $set: {
            email: req.body.email,
          },
        }
      );

      res.status(200).send({
        message: "User Email updated successfully!",
        status: 200,
      });
    } else {
      res.status(400).send({
        message: "User not exist!",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const changeUserPassword = async (req, res) => {
  try {
    const isExist = await User.findOne({ _id: req.params.id });

    if (isExist) {
      const newPassword = bcrcypt.hashSync(req.body.password);
      const result = await User.updateOne(
        { _id: req.params.id },
        {
          $set: {
            password: newPassword,
          },
        }
      );

      res.status(200).send({
        message: "User Password updated successfully!",
        status: 200,
      });
    } else {
      res.status(400).send({
        message: "User not exist!",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  getUser,
  editUser,
  changeUserEmail,
  changeUserPassword,
};
