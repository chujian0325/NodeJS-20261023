const express = require("express");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const app = express();
// 会自动在数据库中创建sessions集合，用于存储session数据
app.use(
  session({
    name: "sid", // 设置cookie的name，默认值是connect.sid
    secret: "atguigu", // 参与加密的字符串，又称签名、加盐
    saveUninitialized: false, // 是否为每次请求都设置一个cookie用来存储session的id
    resave: true, // 是否每次请求都重新保存session，默认是false
    // 设置session的存储位置
    store: new MongoStore({
      mongoUrl: "mongodb://localhost:27017/bilibili",
      mongoOptions: {
        serverSelectionTimeoutMS: 3000, // 3秒连不上mongo直接报错，防止接口卡死
      },
    }),
    cookie: {
      httpOnly: true, // 开启后，前端无法通过js操作
      maxAge: 24 * 60 * 60 * 1000, // 设置sessionID的过期时间
    },
  }),
);

app.get("/", (req, res) => {
  res.send("hello world");
});
// 设置session信息，返回登录成功
app.get("/login", (req, res) => {
  // http://127.0.0.1:3000/login?username=admin&password=admin，返回登录成功
  if (req.query.username == "admin" && req.query.password == "admin") {
    // 设置session信息
    req.session.username = "admin";
    req.session.uid = "agshjfkfd";
    res.send("登录成功");
  } else {
    res.send("登录失败");
  }
});

// session读取
app.get("/cart", (req, res) => {
  // 检测session是否存在用户数据
  if (req.session.username) {
    res.send("欢迎" + req.session.username + "来到购物车页面");
  } else {
    res.send("请先登录");
  }
});

// session的销毁
app.get("/logout", (req, res) => {
  // 销毁session
  req.session.destroy((err) => {
    if (err) {
      res.send("退出失败");
    } else {
      res.send("退出成功");
    }
  });
});
app.listen(3000, () => {
  console.log("服务器在3000端口启动");
});
