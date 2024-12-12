const express = require("express"); //import express from express
let cors = require("cors"); //import cors from cors
const app = express();
app.use(cors()); //access the cors
app.use(express.json()); //convert json response
const ShopTime = require("./model/ShopTime"); //shop time model
const Product = require("./model/Product"); //product model
const AllProducts = require("./model/AllProducts"); //all products model

// MULTER SetUp ------------------------------------------------------------------------------------
const multer = require("multer"); //import multer from multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); //add original file name
  },
});

const upload = multer({ storage: storage });
// MULTER SetUp ------------------------------------------------------------------------------------

// Mongose SetUp ------------------------------------------------------------------------------------
const mongoose = require("mongoose");
const Banner = require("./model/Banner");
mongoose
  .connect(
    "mongodb+srv://arifulislam:Arifulislam47@techstore1.lrbti.mongodb.net/TechStore?retryWrites=true&w=majority&appName=techStore1"
  )
  .then((res) => console.log("Connected!"))
  .catch((err) => console.log("not connected!"));
// Mongose SetUp ------------------------------------------------------------------------------------

// Server Setup ------------------------------------------------------------------------------------
app.use("/uploads", express.static("./uploads"));

// Shop Time Management start ------------------------------------------------------------------------
app.post("/shop_time", async function (req, res) {
  let data = new ShopTime(req.body);
  await data.save();
  res.send(data);
});

app.get("/shop_time", async function (req, res) {
  let data = await ShopTime.findOne();
  res.send(data);
});

app.put("/shop_time/:id", async function (req, res) {
  await ShopTime.findByIdAndUpdate(req.params.id, req.body).then(() => {
    res.send("Updated Successfully");
  });
});
// Shop Time Management End ------------------------------------------------------------------------

// Product upload start ------------------------------------------------------------------------
app.get("/product", upload.single("image"), async function (req, res) {
  const products = await Product.find({});
  res.send(products);
});

app.post("/product", upload.single("image"), async function (req, res) {
  const product = new Product({ ...req.body, image: req.file.path });
  await product.save();
  res.send(product);
});

app.put("/product/:id", upload.single("image"), async function (req, res) {
  const existingProduct = await Product.findById(req.params.id);
  const updatedData = {
    ...req.body,
    image: req.file ? req.file.path : existingProduct.image,
  };
  if (req.file) {
    updatedData.image = req.file.path;
  }
  await Product.findByIdAndUpdate(req.params.id, updatedData).then(() => {
    res.send("Updated Successfully");
  });
});

app.delete("/product/:id", async function (req, res) {
  await Product.findByIdAndDelete(req.params.id);
  res.send("Deleted Successfully");
});
// Product upload End ------------------------------------------------------------------------

// All Products Management start ------------------------------------------------------------------------
app.post("/all_product", upload.single("image"), async function (req, res) {
  const product = new AllProducts({ ...req.body, image: req.file.path });
  await product.save();
  res.send(product);
});

app.get("/all_product", async function (req, res) {
  let data = await AllProducts.find({});
  res.send(data);
});

app.put("/all_product/:id", upload.single("image"), async function (req, res) {
  await Product.findByIdAndUpdate(req.params.id, req.body).then(() => {
    res.send("Updated Successfully");
  });
});
// All Products Management End ------------------------------------------------------------------------

//Banner Upload Start ------------------------------------------------------------------------
app.post("/banner", upload.single("image"), async function (req, res) {
  const banner = new Banner({ ...req.body });
  await banner.save();
  res.send(banner);
  console.log(req.body);
  console.log(req.file);
  
});

app.get("/banner", async function (req, res) {
  let data = await Banner.find({});
  res.send(data);
});

app.put("/banner/:id", upload.single("image"), async function (req, res) {
  const existingBanner = await Product.findById(req.params.id);
  const updatedData = {
    ...req.body,
    image: req.file ? req.file.path : existingBanner.image,
  };
  if (req.file) {
    updatedData.image = req.file.path;
  }

  await Banner.findByIdAndUpdate(req.params.id, updatedData).then(() => {
    res.send("Updated Successfully");
  });
});
//Banner Upload End ------------------------------------------------------------------------

app.listen(8080);
