const mongoose = require("mongoose");

const dbConnect = () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  mongoose.connect("mongodb://localhost:27017/bookit");
};

module.exports = dbConnect;
