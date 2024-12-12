const mongoose = require("mongoose");
const { Schema } = mongoose;

let Product = new Schema({
  title: String,
  fixedPrice: String,
  discountPrice: String,
  description: String,
  stockStatus: String,
  rating: String,
  image: String,
});

module.exports = mongoose.model("Product", Product);
