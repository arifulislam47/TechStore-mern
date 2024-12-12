const mongoose = require("mongoose");
const { Schema } = mongoose;

let Banner = new Schema({
  link: String,
  image: String,
});

module.exports = mongoose.model("Banner", Banner);
