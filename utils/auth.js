require("dotenv").config();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const generateToken = async (user) => {
  return jwt.sign(
    {
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

const sendVerificationEmail = async (user) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.NODEMAILER_GMAIL_USER,
      pass: process.env.NODEMAILER_GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.NODEMAILER_GMAIL_USER,
    to: user?.email,
    subject: "Email Verification!!",
    html: `<p>Hi there,</p>
    <p>Please click the following link to verify your account:</p>
    <a href="${process.env.SERVER_URL}/api/users/verify/${user?.email}">Link</a>
    <p>If you did not sign up for an account, you can safely ignore this email.</p>
    <p>Thanks!</p>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      return true;
    }
  });
};

module.exports = {
  generateToken,
  sendVerificationEmail,
};
