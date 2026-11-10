const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

// 声明中间件函数
function log(req, res, next) {
  // 获取url和ip
  let { url, ip } = req;
  console.log(url, ip);
  // 将信息保存在access.log中，持续添加，所以用appendFile
  fs.appendFile(
    path.resolve(__dirname, "./access.log"),
    `${url} ${ip}\r\n`,
    (err) => {},
  );
  next();
}
// 使用全局中间件
app.use(log);
// 定义路由
app.get("/home", (req, res) => {
  //   // 获取url和ip
  //   let { url, ip } = req;
  //   console.log(url, ip);
  //   // 将信息保存在access.log中，持续添加，所以用appendFile
  //   fs.appendFile(
  //     path.resolve(__dirname, "./access.log"),
  //     `${url} ${ip}\r\n`,
  //     (err) => {},
  //   );
  res.send("home");
});
app.get("/admin", (req, res) => {
  res.send("admin");
});

app.all("{*splat}", (req, res) => {
  res.send("404 Not Found");
});

app.listen(9000, () => {
  console.log("http://127.0.0.1");
});
