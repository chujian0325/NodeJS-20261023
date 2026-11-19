var express = require("express");
var router = express.Router();
const UserModel = require("../../models/UserModel");
const md5 = require("md5");
const moment = require("moment");
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

// 登录页面
router.get("/login", function (req, res, next) {
  res.render("auth/login");
});

// 登录提交
router.post("/login", async function (req, res, next) {
  try {
    let username = req.body.username;
    let password = md5(req.body.password);
    // 查询数据库，判断用户名和密码是否正确
    let result = await UserModel.findOne({
      username,
      password,
    });
    console.log(result);
    if (!result) {
      res.send("用户名或密码错误");
    } else {
      // 登录成功，将用户信息存储到session中
      req.session.username = result.username;
      req.session._id = result._id;
      res.render("success", { msg: "登录成功", url: "/account" });
    }
  } catch (error) {
    res.json({
      code: 200,
      data: null,
      msg: "登录失败",
    });
  }
});

// 退出登录
router.get("/logout", async function (req, res, next) {
  try {
    // 销毁session
    req.session.destroy();
    res.render("success", { msg: "退出成功", url: "/login" });
  } catch (error) {
  }
});
module.exports = router;
