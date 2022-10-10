const express = require("express");
const router = express.Router();
const ProductModel = require("../models/product");

// Create Product
router.post("/", async (req, res) => {
  const productData = {
    name: req.body.name,
    price: req.body.price,
    img: req.body.img,
  };
  const product = new ProductModel(productData);

  try {
    const savedProduct = await product.save();
    res.json(savedProduct);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const prodcts = await ProductModel.find({});
    res.json(prodcts);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get one product by ID
router.get("/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await ProductModel.findOne({ _id });
    user ? res.json(user) : res.status(500).json("user not found");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Delete product
router.delete("/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    await ProductModel.deleteOne({ _id });
    res.status(204).send("Deleted Successed");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// put, patch product - search
module.exports = { productsRouter: router };
