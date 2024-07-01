const mongoose = require("mongoose");

module.exports.connectMognoDb = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("MongoDb connected");
  } catch (error) {
    console.log("Error in mongodb", error);
  }
};
