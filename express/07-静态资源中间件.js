const express = require("express");
const app = express();
// 静态资源中间件设置,express.static的参数是静态资源的路径，它还会自动设置响应头MIME类型
app.use(express.static(__dirname + "/public"));

// 定义路由
app.get("/home", (req, res) => {
  res.send("home");
});

app.get("/admin", (req, res) => {
  res.send("admin");
});
app.get("/setting", (req, res) => {
  res.send("setting");
});

app.all("{*splat}", (req, res) => {
  res.send("404 Not Found");
});

app.listen(9000, () => {
  console.log("http://127.0.0.1");
});
