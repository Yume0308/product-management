const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

module.exports.connect = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL);
    console.log("Connect to database Mongoose success");
  } catch (error) {
    setTimeout(this.connect(), 3000);
  }
};
