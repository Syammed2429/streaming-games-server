//importing the required packages
const mongoose = require("mongoose");
require("dotenv").config();

//Connecting to Mongoose DB
const connect = () => {
  return mongoose.connect(process.env.MONGODB_URI);
};

//exporting the module
module.exports = connect;
