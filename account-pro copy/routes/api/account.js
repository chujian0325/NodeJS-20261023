var express = require("express");
var router = express.Router();
const AccountModel = require("../../models/AccountModel");
const moment = require("moment");

/* 记账本列表. */
router.get("/account", async function (req, res, next) {
  try {
    let result = await AccountModel.find().sort({ time: -1 });
    // 响应成功的JSON数据
    res.json({
      code: "0000",
      data: result,
      message: "读取成功",
    });
  } catch (error) {
    res.json({
      code: "1001",
      data: null,
      message: "读取失败",
    });
  }
});
router.get("/account/create", function (req, res, next) {
  res.render("create");
});
// 新增记录
router.post("/account", async function (req, res, next) {
  // 获取请求数据， 2026-11-12 需要转为日期对象 new Date()，借助moment
  console.log("请求体", req.body);
  try {
    // 插入数据库
    let result = await AccountModel.create({
      ...req.body,
      time: moment(req.body.time).toDate(),
    });
    res.json({
      code: "0000",
      data: result,
      message: "新增成功",
    });
  } catch (error) {
    res.json({
      code: "1002",
      data: null,
      message: "新增失败",
    });
  }
});

// 删除
router.get("/account/:id", async function (req, res, next) {
  let id = req.params.id;
  await AccountModel.deleteOne({ _id: id });
  res.render("success", { msg: "删除成功", url: "/account" });
});
module.exports = router;
