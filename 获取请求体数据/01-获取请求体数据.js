/**
 * 按要求搭建http服务
 * GET /login 显示表单网页
 * POST /login 获取表单的【用户名】和【密码】请求体数据，并返回响应
 */
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.get("/login", (req, res) => {
  // res.send('表单页面')
  // 响应html文件
  res.sendFile(__dirname + "/01-form.html");
});
// 解析json格式的请求体数据
let jsonParser = bodyParser.json();

// 解析urlencoded格式的请求体数据
let urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post("/login", urlencodedParser, (req, res) => {
  res.send(`用户名：${req.body.username}，密码：${req.body.password}`);
});
app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
