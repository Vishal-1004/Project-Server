const mongoose = require("mongoose");

const DB =
  "mongodb+srv://admin:admin123@cluster0.lw3lf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(DB);
    console.log("Database Connected");
  } catch (error) {
    console.log("Database connection error:", error);
    process.exit(1); // Exit the process if the database connection fails
  }
};

module.exports = connectDB;
