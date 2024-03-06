const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const dataSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  brand: String,
  category: String,
  thumbnail: String,
  deleted: {
    type: Boolean,
    default: false,
    require: true,
  },
  slug: {
    type: String,
    slug: "title",
    unique: true,
    trim: true,
  },
  position: Number,
  status: {
    type: String,
    require: true,
    default: "active",
  },
  // create_At: {
  //   type: Date,
  //   require: true,
  //   default: Date.now,
  // },
  // update_At: {
  //   type: Array,
  //   require: false,
  //   default: [],
  // },
},{
  timestamps:true,
});

const databaseProduct = mongoose.model("product", dataSchema, "product");

module.exports = databaseProduct;
