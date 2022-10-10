const mongoose = require("mongoose");
const validate = require("mongoose-validator");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Category is required!!"],
    minLength: 3,
    maxLength: 25,
    unique: true,
  },
  timestamp: { type: Date, default: Date.now() },
  products: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
});
const CategoryModel = mongoose.model("category", CategorySchema);

module.exports = CategoryModel;
