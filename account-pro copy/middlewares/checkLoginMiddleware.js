// 声明中间件，检测登录状态

module.exports = function (req, res, next) {
  if (!req.session.username) {
    res.redirect("/login");
    return;
  }
  next();
};