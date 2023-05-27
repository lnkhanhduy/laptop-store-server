const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  idUser: {
    type: String,
  },
  name: {
    type: String,
  },
  name_product: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  status: {
    type: String,
    default: 'add-cart',
  },
  quantity: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  id_product: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    require: true,
  },
  guarantee: {
    type: Date,
    require: true,
  },
});

module.exports = mongoose.model('carts', CartSchema);
