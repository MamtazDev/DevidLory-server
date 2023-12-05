const User = require("./user.model");
const bcrcypt = require("bcryptjs");
const randomstring = require("randomstring");

const {
  generateToken,
  sendVerificationEmail,
  sendVerificationCode,
} = require("../../utils/auth");

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
        status: 200,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (user && bcrcypt.compareSync(password, user?.password)) {
      const accessTOken = await generateToken(user);

      const userWithoutPassword = { ...user.toObject() };
      delete userWithoutPassword.password;

      return res.send({
        message: "Logged in successfully",
        status: 200,
        user: userWithoutPassword,
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
  const { image, fullName, phoneNumber, country } = req.body;
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      if (image) {
        user.image = image;
      }

      user.fullName = fullName;
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
          message: `${result.userName} is successfully removed!`,
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
    const isExist = await User.findOne({ email: req.params.email });

    if (isExist) {
      const newPassword = bcrcypt.hashSync(req.body.password);
      const result = await User.updateOne(
        { email: req.params.email },
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

const sendOTPToEmail = async (req, res) => {
  try {
    const isExist = await User.findOne({ email: req.params.email });

    if (isExist) {
      const otp = randomstring.generate({ length: 4, charset: "numeric" });
      await sendVerificationCode(req.params.email, otp);

      res.status(200).send({
        message: "OTP Send to email successfully. Please Check your email!",
        OTP: otp,
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

const updateSubscriptionStatus = async (req, res) => {
  try {
    const isExist = await User.findOne({ _id: req.params.id });

    if (isExist) {
      const result = await User.updateOne(
        { _id: req.params.id },
        {
          $set: {
            isSubscribed: true,
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

const updateUserBuffer = async (req, res) => {
  try {
    const isExist = await User.findOne({ _id: req.params.id });

    const pdfBuffer = req.file.buffer; // Access the uploaded file buffer

    console.log("pdfBuffer", pdfBuffer);

    // Here you can perform any additional processing or save the file as needed

    // Send a response back to the client
    res.status(200).json({ message: "File uploaded successfully" });

    if (isExist) {
      const result = await User.updateOne(
        { _id: req.params.id },
        {
          $set: {
            pdfBuffer: req.body.data,
          },
        }
      );

      res.status(200).send({
        message: "User PDF updated successfully!",
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
  sendOTPToEmail,
  updateSubscriptionStatus,
  updateUserBuffer,
};
