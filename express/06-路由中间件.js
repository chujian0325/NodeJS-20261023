const express = require("express");
const app = express();

// 定义路由
app.get("/home", (req, res) => {
  res.send("home");
});

// 声明路由中间件
function checkCodeMiddleware(req, res, next) {
  // 判断url是否有code = 521
  if (req.query.code == "521") {
    next();
  } else {
    res.send("没有权限");
  }
}

app.get("/admin", checkCodeMiddleware, (req, res) => {
  res.send("admin");
});
app.get("/setting", checkCodeMiddleware, (req, res) => {
  res.send("setting");
});

app.all("{*splat}", (req, res) => {
  res.send("404 Not Found");
});

app.listen(9000, () => {
  console.log("http://127.0.0.1");
});
