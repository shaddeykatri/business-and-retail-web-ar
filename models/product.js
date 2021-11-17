const mongoose = require("mongoose");

const product = new mongoose.Schema({
  name: {
    type: String,
  },

  description: {
    type: String,
  },
  short_description: {
    type: String,
  },

  ios_src: {
    type: String,
  },

  src: {
    type: String,
  },

  category: {
    type: String,
  },

  product_image_url: {
    type: String,
  },

  price: {
    type: Number,
  },

  industry: {
    type: String,
  },
});

module.exports = {
  Fashion: mongoose.model("Fashion", product),
  Furniture: mongoose.model("Furniture", product),
  Machinery: mongoose.model("Machinery", product),
};
