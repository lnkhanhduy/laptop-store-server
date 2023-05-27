const express = require('express');
const router = express.Router();
const uploadImage = require('../middleware/UploadImage');
const Product = require('../models/Product');
const verifyToken = require('../middleware/VerifyToken');
const verifyRole = require('../middleware/VerifyRole');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const limit = 10;

//Thêm sản phẩm
router.post('/add', verifyToken, verifyRole, uploadImage.array('images'), async (req, res) => {
  const {
    typeProduct,
    name,
    brand,
    guarantee,
    series,
    color,
    CPU_Generation,
    CPU,
    RAM,
    screen,
    ROM,
    connector,
    wireless_connector,
    keyboard,
    OS,
    size,
    battery,
    weight,
    security,
    led,
    time_earphone,
    time_charging_box,
    charging_port,
    wattage,
    used_time,
    dpi,
    distance_connector,
    keys_number,
    keys_switch,
    inch,
    type_screen,
    resolution,
    touch,
    background_panels,
    sweep_frequency,
    color_number,
    technology,
    capacity,
    generation,
    bus,
    type_rom,
    speed_write,
    speed_read,
    price,
    quantity,
    sold,
  } = req.body;

  const images = req.files;

  if (images.length > 5) {
    return res.status(400).json({ success: false, massage: 'Tối đa 5 ảnh!' });
  }

  switch (typeProduct) {
    case 'laptop':
      if (
        !name ||
        !brand ||
        !guarantee ||
        !series ||
        !color ||
        !CPU_Generation ||
        !CPU ||
        !RAM ||
        !screen ||
        !ROM ||
        !connector ||
        !wireless_connector ||
        !keyboard ||
        !OS ||
        !size ||
        !battery ||
        !weight ||
        !security ||
        !led ||
        !price ||
        !quantity ||
        !images
      ) {
        return res.status(400).json({ success: false, massage: 'Vui lòng nhập đầy đủ thông tin sản phẩm!' });
      }

      try {
        const newLaptop = new Product({
          name,
          type_product: typeProduct,
          type: typeProduct,
          price,
          quantity,
          sold,
          brand,
          more_info: [
            {
              guarantee,
              series,
              color,
              CPU_Generation,
              CPU,
              RAM,
              screen,
              ROM,
              connector,
              wireless_connector,
              keyboard,
              OS,
              size,
              battery,
              weight,
              security,
              led,
            },
          ],
          images,
        });
        await newLaptop.save();

        return res.json({ success: true, massage: 'Thêm sản phẩm thành công', product: newLaptop });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

    case 'earphone':
      if (
        !name ||
        !time_earphone ||
        !time_charging_box ||
        !charging_port ||
        !size ||
        !weight ||
        !connector ||
        !brand ||
        !price ||
        !quantity ||
        !images
      ) {
        return res.status(400).json({ success: false, massage: 'Vui lòng nhập đầy đủ thông tin sản phẩm!' });
      }

      try {
        const newEarphone = new Product({
          name,
          type_product: 'accessory',
          type: typeProduct,
          price,
          quantity,
          sold,
          brand,
          more_info: [
            {
              time_earphone,
              time_charging_box,
              charging_port,
              size,
              weight,
              connector,
            },
          ],
          images,
        });
        await newEarphone.save();

        return res.json({ success: true, massage: 'Thêm sản phẩm thành công', product: newEarphone });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

    case 'speaker':
      if (!name || !wattage || !used_time || !size || !connector || !brand || !price || !quantity || !images) {
        return res.status(400).json({ success: false, massage: 'Vui lòng nhập đầy đủ thông tin sản phẩm!' });
      }

      try {
        const newSpeaker = new Product({
          name,
          type_product: 'accessory',
          type: typeProduct,
          price,
          quantity,
          sold,
          brand,
          more_info: [
            {
              wattage,
              used_time,
              size,
              connector,
            },
          ],
          images,
        });
        await newSpeaker.save();

        return res.json({ success: true, massage: 'Thêm sản phẩm thành công', product: newSpeaker });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

    case 'mouse':
      if (!name || !dpi || !weight || !connector || !distance_connector || !brand || !price || !quantity || !images) {
        return res.status(400).json({ success: false, massage: 'Vui lòng nhập đầy đủ thông tin sản phẩm!' });
      }

      try {
        const newMouse = new Product({
          name,
          type_product: 'accessory',
          type: typeProduct,
          price,
          quantity,
          sold,
          brand,
          more_info: [
            {
              dpi,
              weight,
              connector,
              distance_connector,
            },
          ],
          images,
        });
        await newMouse.save();

        return res.json({ success: true, massage: 'Thêm sản phẩm thành công', product: newMouse });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

    case 'keyboard':
      if (
        !name ||
        !OS ||
        !size ||
        !connector ||
        !distance_connector ||
        !keys_number ||
        !keys_switch ||
        !led ||
        !brand ||
        !price ||
        !quantity ||
        !images
      ) {
        return res.status(400).json({ success: false, massage: 'Vui lòng nhập đầy đủ thông tin sản phẩm!' });
      }

      try {
        const newKeyboard = new Product({
          name,
          type_product: 'accessory',
          type: typeProduct,
          price,
          quantity,
          sold,
          brand,
          more_info: [
            {
              OS,
              size,
              connector,
              distance_connector,
              keys_number,
              keys_switch,
              led,
            },
          ],
          images,
        });
        await newKeyboard.save();

        return res.json({ success: true, massage: 'Thêm sản phẩm thành công', product: newKeyboard });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

    case 'screen':
      if (
        !name ||
        !inch ||
        !type_screen ||
        !resolution ||
        !touch ||
        !background_panels ||
        !sweep_frequency ||
        !color_number ||
        !technology ||
        !connector ||
        !wattage ||
        !size ||
        !weight ||
        !price ||
        !quantity ||
        !images
      ) {
        return res.status(400).json({ success: false, massage: 'Vui lòng nhập đầy đủ thông tin sản phẩm!' });
      }

      try {
        const newScreen = new Product({
          name,
          type_product: typeProduct,
          type: typeProduct,
          price,
          quantity,
          sold,
          more_info: [
            {
              inch,
              type_screen,
              resolution,
              touch,
              background_panels,
              sweep_frequency,
              color_number,
              technology,
              connector,
              wattage,
              size,
              weight,
            },
          ],
          images,
        });
        await newScreen.save();

        return res.json({ success: true, massage: 'Thêm sản phẩm thành công', product: newScreen });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

    case 'ram':
      if (!name || !capacity || !generation || !bus || !brand || !price || !quantity || !images) {
        return res.status(400).json({ success: false, massage: 'Vui lòng nhập đầy đủ thông tin sản phẩm!' });
      }

      try {
        const newRAM = new Product({
          name,
          type_product: 'accessory_pc',
          type: typeProduct,
          price,
          quantity,
          sold,
          brand,
          more_info: [
            {
              capacity,
              generation,
              bus,
            },
          ],
          images,
        });
        await newRAM.save();

        return res.json({ success: true, massage: 'Thêm sản phẩm thành công', product: newRAM });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

    case 'rom':
      if (
        !name ||
        !capacity ||
        !type_rom ||
        !connector ||
        !speed_write ||
        !speed_read ||
        !size ||
        !brand ||
        !price ||
        !quantity ||
        !images
      ) {
        return res.status(400).json({ success: false, massage: 'Vui lòng nhập đầy đủ thông tin sản phẩm!' });
      }

      try {
        const newROM = new Product({
          name,
          type_product: 'accessory_pc',
          type: typeProduct,
          price,
          quantity,
          sold,
          brand,
          more_info: [
            {
              capacity,
              type_rom,
              connector,
              speed_write,
              speed_read,
              size,
            },
          ],
          images,
        });
        await newROM.save();

        return res.json({ success: true, massage: 'Thêm sản phẩm thành công', product: newROM });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }
    default:
      return res.status(400).json({ success: false, message: 'Lỗi thêm sản phẩm!' });
  }
});

router.post('/update-laptop', uploadImage.array('images'), async (req, res) => {
  const id = req.query.id;
  const images = req.files;

  try {
    const newLaptop = await Product.findByIdAndUpdate(id, {
      images,
    });

    await newLaptop?.images?.forEach((image) => {
      const path = image.path.split('/');
      const name = path[path.length - 1].split('.')[0];
      cloudinary.uploader.destroy(`laptop-store/${name}`, function (error, result) {
        console.log(result, error);
      });
    });

    return res.json({ success: true, massage: 'Sửa sản phẩm thành công', product: newLaptop });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
//Cập nhật sản phẩm
router.post('/update', verifyToken, verifyRole, uploadImage.array('images'), async (req, res) => {
  const id = req.query.id;

  const {
    typeProduct,
    name,
    brand,
    guarantee,
    series,
    color,
    CPU_Generation,
    CPU,
    RAM,
    screen,
    ROM,
    connector,
    wireless_connector,
    keyboard,
    OS,
    size,
    battery,
    weight,
    security,
    led,
    time_earphone,
    time_charging_box,
    charging_port,
    wattage,
    used_time,
    dpi,
    distance_connector,
    keys_number,
    keys_switch,
    inch,
    type_screen,
    resolution,
    touch,
    background_panels,
    sweep_frequency,
    color_number,
    technology,
    capacity,
    generation,
    bus,
    type_rom,
    speed_write,
    speed_read,
    price,
    quantity,
    sold,
  } = req.body;

  const images = req.files;

  if (images.length > 5) {
    return res.status(400).json({ success: false, massage: 'Tối đa 5 ảnh!' });
  }

  switch (typeProduct) {
    case 'laptop':
      try {
        const newLaptop = await Product.findByIdAndUpdate(id, {
          name,
          type_product: typeProduct,
          type: typeProduct,
          price,
          quantity,
          sold,
          brand,
          more_info: [
            {
              guarantee,
              series,
              color,
              CPU_Generation,
              CPU,
              RAM,
              screen,
              ROM,
              connector,
              wireless_connector,
              keyboard,
              OS,
              size,
              battery,
              weight,
              security,
              led,
            },
          ],
          images,
        });

        await newLaptop?.images?.forEach((image) => {
          const path = image.path.split('/');
          const name = path[path.length - 1].split('.')[0];
          cloudinary.uploader.destroy(`laptop-store/${name}`, function (error, result) {
            console.log(result, error);
          });
        });

        return res.json({ success: true, massage: 'Sửa sản phẩm thành công', product: newLaptop });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

    case 'earphone':
      try {
        const newEarphone = await Product.findByIdAndUpdate(id, {
          name,
          type_product: 'accessory',
          type: typeProduct,
          price,
          quantity,
          sold,
          brand,
          more_info: [
            {
              time_earphone,
              time_charging_box,
              charging_port,
              size,
              weight,
              connector,
            },
          ],
          images,
        });

        await newEarphone?.images?.forEach((image) => {
          const path = image.path.split('/');
          const name = path[path.length - 1].split('.')[0];
          cloudinary.uploader.destroy(`laptop-store/${name}`, function (error, result) {
            console.log(result, error);
          });
        });

        return res.json({ success: true, massage: 'Sửa sản phẩm thành công', product: newEarphone });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

    case 'speaker':
      try {
        const newSpeaker = await Product.findByIdAndUpdate(id, {
          name,
          type_product: 'accessory',
          type: typeProduct,
          price,
          quantity,
          sold,
          brand,
          more_info: [
            {
              wattage,
              used_time,
              size,
              connector,
            },
          ],
          images,
        });

        await newSpeaker?.images?.forEach((image) => {
          const path = image.path.split('/');
          const name = path[path.length - 1].split('.')[0];
          cloudinary.uploader.destroy(`laptop-store/${name}`, function (error, result) {
            console.log(result, error);
          });
        });

        return res.json({ success: true, massage: 'Sửa sản phẩm thành công', product: newSpeaker });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

    case 'mouse':
      try {
        const newMouse = await Product.findByIdAndUpdate(id, {
          name,
          type_product: 'accessory',
          type: typeProduct,
          price,
          quantity,
          sold,
          brand,
          more_info: [
            {
              dpi,
              weight,
              connector,
              distance_connector,
            },
          ],
          images,
        });

        await newMouse?.images?.forEach((image) => {
          const path = image.path.split('/');
          const name = path[path.length - 1].split('.')[0];
          cloudinary.uploader.destroy(`laptop-store/${name}`, function (error, result) {
            console.log(result, error);
          });
        });

        return res.json({ success: true, massage: 'Sửa sản phẩm thành công', product: newMouse });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

    case 'keyboard':
      try {
        const newKeyboard = await Product.findByIdAndUpdate(id, {
          name,
          type_product: 'accessory',
          type: typeProduct,
          price,
          quantity,
          sold,
          brand,
          more_info: [
            {
              OS,
              size,
              connector,
              distance_connector,
              keys_number,
              keys_switch,
              led,
            },
          ],
          images,
        });

        await newKeyboard?.images?.forEach((image) => {
          const path = image.path.split('/');
          const name = path[path.length - 1].split('.')[0];
          cloudinary.uploader.destroy(`laptop-store/${name}`, function (error, result) {
            console.log(result, error);
          });
        });

        return res.json({ success: true, massage: 'Sửa sản phẩm thành công', product: newKeyboard });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

    case 'screen':
      try {
        const newScreen = await Product.findByIdAndUpdate(id, {
          name,
          type_product: typeProduct,
          type: typeProduct,
          price,
          quantity,
          sold,
          more_info: [
            {
              inch,
              type_screen,
              resolution,
              touch,
              background_panels,
              sweep_frequency,
              color_number,
              technology,
              connector,
              wattage,
              size,
              weight,
            },
          ],
          images,
        });

        await newScreen?.images?.forEach((image) => {
          const path = image.path.split('/');
          const name = path[path.length - 1].split('.')[0];
          cloudinary.uploader.destroy(`laptop-store/${name}`, function (error, result) {
            console.log(result, error);
          });
        });

        return res.json({ success: true, massage: 'Sửa sản phẩm thành công', product: newScreen });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

    case 'ram':
      try {
        const newRAM = await Product.findByIdAndUpdate(id, {
          name,
          type_product: 'accessory_pc',
          type: typeProduct,
          price,
          quantity,
          sold,
          brand,
          more_info: [
            {
              capacity,
              generation,
              bus,
            },
          ],
          images,
        });

        await newRAM?.images?.forEach((image) => {
          const path = image.path.split('/');
          const name = path[path.length - 1].split('.')[0];
          cloudinary.uploader.destroy(`laptop-store/${name}`, function (error, result) {
            console.log(result, error);
          });
        });

        return res.json({ success: true, massage: 'Sửa sản phẩm thành công', product: newRAM });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

    case 'rom':
      try {
        const newROM = await Product.findByIdAndUpdate(id, {
          name,
          type_product: 'accessory_pc',
          type: typeProduct,
          price,
          quantity,
          sold,
          brand,
          more_info: [
            {
              capacity,
              type_rom,
              connector,
              speed_write,
              speed_read,
              size,
            },
          ],
          images,
        });

        await newROM?.images?.forEach((image) => {
          const path = image.path.split('/');
          const name = path[path.length - 1].split('.')[0];
          cloudinary.uploader.destroy(`laptop-store/${name}`, function (error, result) {
            console.log(result, error);
          });
        });

        return res.json({ success: true, massage: 'Sửa sản phẩm thành công', product: newROM });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }
    default:
      return res.status(400).json({ success: false, message: 'Lỗi sửa sản phẩm!' });
  }
});

//Xóa sản phẩm
router.post('/delete', verifyToken, verifyRole, async (req, res) => {
  const id = req.query.id;

  try {
    const deleteProduct = await Product.findByIdAndDelete(id);

    await deleteProduct?.images?.forEach((image) => {
      const path = image.path.split('/');
      const name = path[path.length - 1].split('.')[0];
      cloudinary.uploader.destroy(`laptop-store/${name}`, function (error, result) {
        console.log(result, error);
      });
    });

    return res.json({ success: true, massage: 'Xóa sản phẩm thành công', product: deleteProduct });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

//Lấy tất cả sản phẩm
router.get('/', async (req, res) => {
  const sort = req.query.sort;

  try {
    const allProduct = await Product.find().sort({ sold: sort });
    return res.json({ success: true, message: 'Tất cả sản phẩm', product: allProduct });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

//Tìm kiếm sản phẩm
router.get('/search', async (req, res) => {
  const keyword = req.query.search?.trim();
  const sortPrice = req.query.sort;
  const page = req.query.page || 1;
  const pageInt = page && parseInt(page);
  const skip = (pageInt - 1) * limit;
  if (sortPrice) {
    try {
      const search = await Product.find({ name: { $regex: `(?i)${keyword}(?-i)` } })
        .skip(skip)
        .limit(limit)
        .sort({ price: sortPrice });
      const page = search.length > 0 && pageInt + 1;
      const sortNexPage = sortPrice ? `&sort=${sortPrice}` : '';
      return res.json({
        success: true,
        message: `Tất cả sản phẩm có từ khoá ${keyword}`,
        product: search,
        next_page: page ? `?search=${keyword}${sortNexPage}&page=${page}` : 'end',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  } else {
    try {
      const search = await Product.find({ name: { $regex: `(?i)${keyword}(?-i)` } })
        .skip(skip)
        .limit(limit)
        .sort({ sold: 'desc' });
      const page = search.length > 0 && pageInt + 1;
      return res.json({
        success: true,
        message: `Tất cả sản phẩm có từ khoá ${keyword}`,
        product: search,
        next_page: page ? `?search=${keyword}&page=${page}` : 'end',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
});

//Lấy sản phẩm theo id sản phẩm
router.get('/product', async (req, res) => {
  const id = req.query.id;

  try {
    const product = await Product.findById(id);
    return res.json({ success: true, message: 'Sản phẩm', product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

//Lấy sản phẩm theo loại sản phẩm
router.get('/:type_product', async (req, res) => {
  const type_product = req.params.type_product;
  const sortPrice = req.query.sort;
  const brand = req.query.brand;
  const type = req.query.type;
  const page = req.query.page || 1;
  const pageInt = page && parseInt(page);
  const skip = (pageInt - 1) * limit;
  const sortNexPage = sortPrice ? `&sort=${sortPrice}` : '';

  if (type) {
    try {
      const product = await Product.find({ type_product, type }).skip(skip).limit(limit).sort({ sold: 'desc' });
      const page = product.length > 0 && pageInt + 1;
      return res.json({
        success: true,
        message: 'Sản phẩm',
        product,
        next_page: page ? `?type=${type}&page=${page}${sortNexPage}` : 'end',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  } else if (brand) {
    try {
      const product = await Product.find({ type_product, brand }).skip(skip).limit(limit).sort({ sold: 'desc' });
      const page = product.length > 0 && pageInt + 1;
      return res.json({
        success: true,
        message: 'Sản phẩm',
        product,
        next_page: page ? `?brand=${brand}&page=${page}${sortNexPage}` : 'end',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  } else {
    try {
      if (sortPrice) {
        const typeProduct = await Product.find({ type_product }).skip(skip).limit(limit).sort({ price: sortPrice });
        const page = typeProduct.length > 0 && pageInt + 1;
        return res.json({
          success: true,
          message: `Sản phẩm ${type_product}`,
          product: typeProduct,
          next_page: page ? `?sort=${sortPrice}&page=${page}` : 'end',
        });
      } else {
        const typeProduct = await Product.find({ type_product }).skip(skip).limit(limit).sort({ sold: 'desc' });
        const page = typeProduct.length > 0 && pageInt + 1;
        return res.json({
          success: true,
          message: `Sản phẩm ${type_product}`,
          product: typeProduct,
          next_page: page ? `?page=${page}` : 'end',
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
});

module.exports = router;
