const express = require("express");
const app = express();

// 声明中间件
app.use((req, res, next) => {
  // 检测请求头中的 referrer 是否是127.0.01.0.1
  let referrer = req.get("referrer");
  if (referrer) {
    let url = new URL(referrer);
    let hostname = url.hostname;

    if (hostname !== "127.0.0.1") {
      res.status(403).send("非法盗链");
      return;
    }
  }
  next();
});

app.use(express.static(__dirname + "/public"));

app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
