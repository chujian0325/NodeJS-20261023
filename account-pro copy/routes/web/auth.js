var express = require("express");
var router = express.Router();
const UserModel = require("../../models/UserModel");
const md5 = require("md5");
// 注册
router.get("/reg", function (req, res, next) {
  // 响应html页面
  res.render("auth/reg");
});

// 注册提交
router.post("/reg", async function (req, res, next) {
  try {
    // 先做表单验证
    await UserModel.create({
      ...req.body,
      password: md5(req.body.password),
    });
    res.render("success", { msg: "注册成功", url: "/reg" });
  } catch (error) {
    res.json({
      code: 200,
      data: null,
      msg: "注册失败",
    });
  }
});
module.exports = router;
