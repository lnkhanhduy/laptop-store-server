const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

//Đăng ký
router.post('/register', async (req, res) => {
  const { name, username, password, confirm_password, email } = req.body;

  if (!name) {
    return res.status(400).json({ success: false, message: 'Vui lòng nhập tên!' });
  } else if (!username) {
    return res.status(400).json({ success: false, message: 'Vui lòng nhập tên đăng nhập!' });
  } else if (!password || !confirm_password) {
    return res.status(400).json({ success: false, message: 'Vui lòng nhập mật khẩu!' });
  } else if (password !== confirm_password) {
    return res.status(400).json({ success: false, message: 'Mật khẩu không trùng khớp!' });
  } else if (!email) {
    return res.status(400).json({ success: false, message: 'Vui lòng nhập email!' });
  } else if (!email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Vui lòng nhập đúng định dạng email!' });
  }

  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ success: false, message: 'Tên đăng nhập đã tồn tại!' });
    }

    const emailFoundFromDB = await User.findOne({ email });
    if (emailFoundFromDB) {
      return res.status(400).json({ success: false, message: 'Email đã tồn tại!' });
    }

    const hashedPassword = await argon2.hash(password);
    const newUser = new User({ name, username, password: hashedPassword, email });
    await newUser.save();

    const accessToken = jwt.sign(
      {
        userId: newUser._id,
        name: newUser.name,
        role: newUser.role,
        exp: new Date().setDate(new Date().getDate() + 1),
      },
      process.env.ACCESS_TOKEN_SECRET
    );

    return res.json({
      success: true,
      message: 'Bạn đã tạo tài khoản thành công!',
      accessToken,
      name: newUser.name,
      userId: newUser._id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

//Đăng nhập
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Vui lòng nhập tên đăng nhập hoặc mật khẩu!' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Sai tên đăng nhập hoặc mật khẩu!' });
    }

    const validPassword = await argon2.verify(user.password, password);
    if (!validPassword) {
      return res.status(400).json({ success: false, message: 'Sai tên đăng nhập hoặc mật khẩu' });
    }

    //Return token
    const accessToken = jwt.sign(
      { userId: user._id, name: user.name, role: user.role, exp: new Date().setDate(new Date().getDate() + 1) },
      process.env.ACCESS_TOKEN_SECRET
    );

    return res.json({
      success: true,
      message: 'Đăng nhập thành công!',
      accessToken,
      name: user.name,
      userId: user._id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
