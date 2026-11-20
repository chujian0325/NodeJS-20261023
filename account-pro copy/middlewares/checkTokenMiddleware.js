// 声明中间件，检测登录状态

module.exports = function (req, res, next) {
  const jwt = require("jsonwebtoken");
  // 获取token
  let token = req.get("token");
  if (!token) {
    return res.json({
      code: "2003",
      msg: "token 缺失",
      data: null,
    });
  }
  // 校验token
  jwt.verify(token, "bilibili", (err, authData) => {
    if (err) {
      return res.json({
        code: "2004",
        msg: "token 校验失败",
        data: null,
      });
    }
  });
  next();
};
