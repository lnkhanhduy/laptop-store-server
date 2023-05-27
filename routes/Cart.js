const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/VerifyToken');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

//Thêm vào giỏ hàng
router.post('/add', verifyToken, async (req, res) => {
  const { idProduct, idUser, name, price, total, image } = req.body;
  try {
    const newCart = new Cart({
      idUser,
      id_product: idProduct,
      name_product: name,
      price,
      total,
      image,
    });
    await newCart.save();

    return res.json({ success: true, massage: 'Thêm vào giỏ hàng thành công', data: newCart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

//Tìm sản phẩm
const findProduct = async (id) => {
  try {
    const product = await Product.findById(id);
    return product;
  } catch (error) {
    console.log(error);
  }
};

//Cập nhật sản phẩm
const updateProduct = async (id, body) => {
  try {
    const product = await Product.findByIdAndUpdate(id, body);
    return product;
  } catch (error) {
    console.log(error);
  }
};

//Mua hàng
router.post('/buy_product', verifyToken, async (req, res) => {
  const { idUser, name, name_product, address, phone, email, quantity, price, image, id_product } = req.body;

  if (
    !idUser ||
    !name ||
    !name_product ||
    !address ||
    !phone ||
    !email ||
    !quantity ||
    !price ||
    !image ||
    !id_product
  ) {
    return res.status(400).json({ success: false, message: 'Vui lòng nhập đầy đủ thông tin' });
  }

  const product = await findProduct(id_product);

  if (product.sold + Number(quantity) <= product.quantity) {
    await updateProduct(id_product, { sold: product.sold + Number(quantity) });

    try {
      const createdAt = new Date();
      const guarantee = new Date(new Date().setDate(new Date().getDate() + 372));

      const newCart = new Cart({
        idUser,
        name,
        name_product,
        address,
        phone,
        email,
        status: 'order',
        quantity,
        price,
        total: Number(price) * Number(quantity),
        image,
        id_product,
        createdAt,
        guarantee,
      });
      await newCart.save();

      return res.json({ success: true, message: 'Mua hàng thành công', data: newCart });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  } else {
    return res.status(500).json({ success: false, message: 'Không đủ số lượng sản phẩm!' });
  }
});

//Lấy tất cả trong giỏ hàng theo id user
router.post('/', verifyToken, async (req, res) => {
  const { idUser } = req.body;

  try {
    const getAllCart = await Cart.find({ idUser });

    return res.json({ success: true, massage: 'Tất cả trong giỏ hàng', data: getAllCart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

//Kiểm tra bảo hành
router.post('/warranty-check', async (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ success: false, message: 'Vui lòng nhập số điện thoại!' });
  } else if (phone.length < 10) {
    return res.status(400).json({ success: false, message: 'Vui lòng nhập đầy đủ số điện thoại!' });
  } else {
    try {
      const listProduct = await Cart.find({ phone }).sort({ createdAt: 'desc' });

      return res.json({ success: true, message: 'Sản phẩm!', product: listProduct });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, message: 'Không tìm thấy sản phẩm!' });
    }
  }
});

module.exports = router;
