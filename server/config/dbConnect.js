const mongoose = require("mongoose");
const dbConnect = () => {
  try {
    const connection = mongoose.connect(process.env.DATABASE);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("une erreur est survenue");
    throw new Error(error);
  }
};

module.exports = dbConnect;
