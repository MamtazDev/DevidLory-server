require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.6ds5s8q.mongodb.net/davidlory`
    );
    console.log("Connected to the mongodb database successfully!");
  } catch (error) {
    console.log("mongodb connection failed", error.message);
  }
};

module.exports = connectDB;
