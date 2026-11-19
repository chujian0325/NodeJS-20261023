var express = require("express");
var router = express.Router();

// 注册
router.get("/reg", function (req, res, next) {
  // 响应html页面
  res.render("auth/reg");
});
module.exports = router;
