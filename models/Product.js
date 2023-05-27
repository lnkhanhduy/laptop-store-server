const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  type_product: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  sold: {
    type: Number,
    default: 0,
  },
  brand: {
    type: String,
  },
  more_info: {
    type: Array,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  images: { type: Array },
});

module.exports = mongoose.model('products', ProductSchema);
