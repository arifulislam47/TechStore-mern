const mongoose = require("mongoose");
const { Schema } = mongoose;

let shopTime = new Schema({
  mondayToThursday: String,
  friday: String,
  saturday: String,
  address: String,
  phone: String,
  email: String,
});

module.exports = mongoose.model("ShopTime", shopTime);