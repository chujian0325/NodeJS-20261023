const express = require("express");
const router = express.Router();
const AccountModel = require("../../models/AccountModel");
const moment = require("moment");

// 声明中间件
const checkTokenMiddleware = require("../../middlewares/checkTokenMiddleware");
/* 记账本列表. */
router.get("/account", checkTokenMiddleware, async function (req, res, next) {
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
// 新增记录
router.post("/account", checkTokenMiddleware, async function (req, res, next) {
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
router.delete("/account/:id", checkTokenMiddleware, async function (req, res, next) {
  let id = req.params.id;
  try {
    await AccountModel.deleteOne({ _id: id });
    res.json({
      code: "0000",
      data: null,
      message: "删除成功",
    });
  } catch (error) {
    res.json({
      code: "1003",
      data: null,
      message: "删除失败",
    });
  }
});
// 查询单条数据
router.get("/account/:id", checkTokenMiddleware, async function (req, res, next) {
  try {
    let id = req.params.id;
    let result = await AccountModel.findById(id);
    // 响应成功的JSON数据
    res.json({
      code: "0000",
      data: result,
      message: "读取成功",
    });
  } catch (error) {
    res.json({
      code: "1004",
      data: null,
      message: "读取失败",
    });
  }
});
// 更新账单信息
router.patch("/account/:id", checkTokenMiddleware,async function (req, res, next) {
  try {
    let id = req.params.id;
    await AccountModel.updateOne(
      {
        _id: id,
      },
      req.body,
    );
    // 再次查询数据库，返回更新后的信息
    // 响应成功的JSON数据
    let resultById = await AccountModel.findById(id);
    res.json({
      code: "0000",
      data: resultById,
      message: "更新成功",
    });
  } catch (error) {
    res.json({
      code: "1004",
      data: null,
      message: "更新失败",
    });
  }
});
module.exports = router;
