const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Không tìm thấy token!' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const nameUser = decoded.name.split(' ');
    req.userId = decoded.userId;
    req.name = nameUser[nameUser.length - 1];
    req.role = decoded.role;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ success: false, message: 'Token không hợp lệ!' });
  }
};

module.exports = verifyToken;
