require("dotenv").config();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const generateToken = async (user) => {
  return jwt.sign(
    {
      role: user.role,
      userName: user?.userName,
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

const sendEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.NODEMAILER_GMAIL_USER,
      pass: process.env.NODEMAILER_GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.NODEMAILER_GMAIL_USER,
    to: "mohiuddinkhan1409@gmail.com",
    subject: "Hello Author!!",
    html: `<p>Hi there,</p>
    <p style="margin-top:10px; margin-bottom:10px">${data?.message}</p>
    <p style="margin-bottom:10px">Thanks!</p> 

    <div>
    <h5>Regards</h5>
    <p>Name: ${data?.name}</p> 
    <p>Email: ${data?.email}</p> 
    <p>Phone: ${data?.phoneNumber}</p> 
    <p>Country: ${data?.country}</p> 
    </div>
    `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      return true;
    }
  });
};

const sendVerificationCode = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.NODEMAILER_GMAIL_USER,
      pass: process.env.NODEMAILER_GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "OTP Code",
    html: `<p>Your OTP for email verification is: ${otp}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      return true;
    }
  });

  // if (emailSent === true) {
  //   return true;
  // }
};

const sendSubscriptionSuccssMessage = async (email) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.NODEMAILER_GMAIL_USER,
      pass: process.env.NODEMAILER_GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.NODEMAILER_GMAIL_USER,
    to: email,
    subject: "Subscription Done!!",
    html: `<p>Hi there,</p>
    <p style="margin-top:10px; margin-bottom:10px">Subscription done successfully!!</p>
    <p style="margin-bottom:10px">Thanks!</p> 
    </div>
    `,
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
  sendVerificationCode,
  sendEmail,
  sendSubscriptionSuccssMessage,
};
