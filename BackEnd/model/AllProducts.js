const mongoose = require("mongoose");
const { Schema } = mongoose;

let all_product = new Schema({
  title: String,
  fixedPrice: String,
  discountPrice: String,
  description: String,
  stockStatus: String,
  rating: String,
  image: String,
});

module.exports = mongoose.model("all_product", all_product);
