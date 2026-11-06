// 1. 导入express
const express = require("express");

// 2. 创建应用对象
const app = express();

// 3. 创建路由规则
app.get("/", (req, res) => {
  res.send("hello home");
});
app.get("/home", (req, res) => {
  console.log(req.method); // GET
  console.log(req.url); // /home
  console.log(req.httpVersion); // 1.1
  console.log(req.headers); // { host: 'localhost:3000', connection: 'keep-alive', ... }

  console.log(req.query); // { name: 'zhangsan', age: '20' }
  console.log(req.path); // /home
  res.send("hello express");
});

// 4. 监听端口，启动服务
app.listen(3000, () => {
  console.log("服务已启动，端口号为3000");
});
