const checkRole = (req, res, next) => {
  if (req.role && req.role === 'admin') {
    next();
  } else {
    return res.status(400).json({ success: false, message: 'Không thể truy cập!' });
  }
};

module.exports = checkRole;
