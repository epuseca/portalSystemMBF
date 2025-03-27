const jwt = require("jsonwebtoken");

const middleware = {
  verifyToken: async (req, res, next) => {
    try {
      // const token = req.headers.cookie.split('token=')[1];
      const token = req.cookies.token;
      if (!token) {
        // return res.status(403).json({ message: 'No token provided'   });
        return res.redirect('/');
      }
      const payload = jwt.verify(token, 'namdv');
      req.user = payload;
      next();
    } catch (error) {
      console.error(error);

      if (error.name === "TokenExpiredError") {
        return res.redirect('/logout'); // Nếu token hết hạn, chuyển hướng đến logout
      }

      return res.redirect('/logout'); // Nếu lỗi khác cũng chuyển hướng logout
    
    }
  },
  roleAdmin: (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    next();
  },
  roleNhanvien: (req, res, next) => {
    if (req.user.role !== 'nhanvien') {
      return res.status(403).json({ message: 'Access denied: Nhan vien only' });
    }
    next();
  },

};

module.exports = middleware;
