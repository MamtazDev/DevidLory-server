const User = require("./user.model");
const bcrcypt = require("bcryptjs");
const { generateToken, sendVerificationEmail } = require("../../utils/auth");

const registerUser = async (req, res) => {
  try {
    const isExist = await User.findOne({ email: req.body.email });
    const isVerified = isExist?.isVerified;
    if (isExist && isVerified === true) {
      return res.status(403).send({
        message: `${req.body.email} is already Exist!`,
        status: 403,
      });
    } else if (isExist && isVerified === false) {
      const password = bcrcypt.hashSync(req.body.password);
      isExist.password = password;

      const updatedUser = await isExist.save();

      await sendVerificationEmail(updatedUser);
      res.status(200).send({
        message: "We have sent you verification link. Please check your email!",
        status: 200,
      });
    } else {
      const newUser = new User({
        role: req.body.role,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        postCode: req.body.postCode,
        residance: req.body.residance,
        password: bcrcypt.hashSync(req.body.password),
      });
      const user = await newUser.save();
      //   const accessTOken = await generateToken(user);

      await sendVerificationEmail(user);

      res.status(200).send({
        message: "We have sent you verification link. Please check your email!",
        status: 200,
      });

      //   res.status(200).send({
      //     message: "User Created successfully",
      //     user,
      //     accessTOken,
      //     status: 200,
      //   });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const emailVirification = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });

    if (!user) {
      res.redirect(`${process.env.MAINWEBSITE_URL}/registrationError`);
    } else if (user && user?.isVerified === true) {
      res.redirect(`${process.env.MAINWEBSITE_URL}/registration-success-sms`);
    } else {
      user.isVerified = true;
      await user.save();
      res.redirect(`${process.env.MAINWEBSITE_URL}/login`);
    }

    // if (!user) {
    //   res.redirect(`${process.env.MAINWEBSITE_URL}/registrationError`);
    // } else if (user && user?.isVerified === true) {
    //   res.redirect(`${process.env.MAINWEBSITE_URL}/registrationError`);
    // } else {
    //   user.isVerified = true;
    //   await user.save();
    //   res.redirect(`${process.env.MAINWEBSITE_URL}/register-success-sms`);
    // }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user?.isVerified === false) {
      return res.status(401).send({
        message: "Please Verify your email.",
        status: 400,
      });
    } else if (
      user &&
      bcrcypt.compareSync(req.body.password, user.password) &&
      user?.isVerified === true
    ) {
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
  const {
    image,
    firstName,
    lastName,
    postCode,
    residance,
    gender,
    availability,
    offerProvide,
    aboutMe,
    phoneNumber,
    streetOrHouseNumber,
  } = req.body;
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      // const distance = "";

      user.image = image;
      user.firstName = firstName;
      user.lastName = lastName;
      user.postCode = postCode;
      user.residance = residance;
      user.streetOrHouseNumber = streetOrHouseNumber;
      user.gender = gender;
      user.availability = availability;
      user.offerProvide = offerProvide;
      user.aboutMe = aboutMe;
      user.phoneNumber = phoneNumber;
      // user.distance = distance;

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

const uploadDocuments = async (req, res) => {
  console.log("upload docs");

  try {
    const user = User.findById(req.params.id);
    if (user) {
      // user.url = req.body.url;
      // user.parentSearch = req.body.parentSearch;
      // console.log("user", req.body);
      // await user.save();

      const result = await User.updateOne(
        { _id: req.params.id },
        {
          $set: {
            url: req.body.url,
            parentSearch: req.body.parentSearch,
          },
        }
      );

      res.status(200).send({
        message: "Documents uploaded successfully!",
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

module.exports = {
  registerUser,
  emailVirification,
  loginUser,
  getAllUsers,
  deleteUser,
  getUser,
  editUser,
  uploadDocuments,
};
