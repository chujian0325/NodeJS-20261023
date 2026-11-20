// 接口校验
var express = require("express");
var router = express.Router();
const UserModel = require("../../models/UserModel");
const md5 = require("md5");
const moment = require("moment");
const jwt = require("jsonwebtoken");

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
      res.json({
        code: "2002",
        data: null,
        msg: "用户名或密码错误",
      });
    } else {
      // 创建当前用户的token
      let token = jwt.sign(
        { username: result.username, _id: result._id },
        "bilibili",
        { expiresIn: 60 * 60 * 24 * 7 }, // 过期时间：7天
      );
      // 响应token
      res.json({
        code: "0000",
        data: token,
        msg: "登录成功",
      });
    }
  } catch (error) {
    res.json({
      code: "2001",
      data: null,
      msg: "数据库读取失败",
    });
  }
});

// 退出登录
router.get("/logout", async function (req, res, next) {
  try {
    // 销毁session
    req.session.destroy();
    res.render("success", { msg: "退出成功", url: "/login" });
  } catch (error) {}
});
module.exports = router;
