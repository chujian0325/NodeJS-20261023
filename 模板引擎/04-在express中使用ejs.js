const express = require("express");
const ejs = require("ejs");
const path = require("path");

const app = express();
// 1. 设置模板引擎为ejs
app.set("view engine", "ejs"); // 设置模板引擎为ejs
// 2. 设置模板文件所在的目录: 模板文件：具有模板内容的文件
app.set("views", path.resolve(__dirname, "./views")); // 设置模板文件所在的目录
app.get("/", (req, res) => {
  // 3.通过render方法渲染模板文件
  // 声明变量
  let title = "hello world";
  res.render("home", {
    title, // 传递给模板的变量
  });
});

app.listen(9000, () => {
  console.log("服务器启动成功");
});
