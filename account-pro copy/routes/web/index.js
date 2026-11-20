const express = require("express");
const router = express.Router();
const AccountModel = require("../../models/AccountModel");
const moment = require("moment");

const checkLoginMiddleware = require("../../middlewares/checkLoginMiddleware");

// 首页路由规则
router.get("/", checkLoginMiddleware, async function (req, res, next) {
  // 重定向
  res.redirect("/account");
  
})
/* 记账本列表页面 */
router.get("/account", checkLoginMiddleware, async function (req, res, next) {
  try {
    let result = await AccountModel.find().sort({ time: -1 });
    res.render("list", { result, moment });
  } catch (error) {}
});
// 新增页面
router.get("/account/create", checkLoginMiddleware, function (req, res, next) {
  res.render("create");
});
// 新增记录
router.post("/account", checkLoginMiddleware, async function (req, res, next) {
  // 获取请求数据， 2026-11-12 需要转为日期对象 new Date()，借助moment
  console.log("请求体", req.body);
  try {
    // 插入数据库
    let result = await AccountModel.create({
      ...req.body,
      time: moment(req.body.time).toDate(),
    });
    res.render("success", { url: "/account", msg: "添加成功" });
  } catch (error) {}
});

// 删除
router.delete(
  "/account/:id",
  checkLoginMiddleware,
  async function (req, res, next) {
    let id = req.params.id;
    try {
      await AccountModel.deleteOne({ _id: id });
      res.render("success", { url: "/account", msg: "删除成功" });
    } catch (error) {}
  },
);
// 查询单条数据
router.get("/account/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    await AccountModel.findById(id);
    res.render("success", { url: "/account", msg: "删除成功" });
  } catch (error) {}
});
// 更新账单信息
router.patch("/account/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    await AccountModel.updateOne(
      {
        _id: id,
      },
      req.body,
    );
    // 再次查询数据库，返回更新后的信息
    await AccountModel.findById(id);
    res.render("success", { url: "/account", msg: "删除成功" });
  } catch (error) {}
});
module.exports = router;
