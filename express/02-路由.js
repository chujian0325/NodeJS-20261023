// 1. 导入express
const express = require("express");

// 2. 创建应用对象
const app = express();

// 3. 创建路由规则
app.get("/", (req, res) => {
  res.send("hello home");
});
app.get("/home", (req, res) => {
  res.send("hello express");
});
// 匹配所有请求方式，一般写在最后
app.all("/about", (req, res) => {
  res.send("hello about");
});
// 404兜底路由，放在所有路由最后！Express 5.3.0 官方正确捕获全部路由写法：`{*splat}`
app.all("{*splat}", (req, res) => {
  res.send("404 Not Found");
});

// 4. 监听端口，启动服务
app.listen(3000, () => {
  console.log("服务已启动，端口号为3000");
});
