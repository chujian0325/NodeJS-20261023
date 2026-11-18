// 1. 安装 npm i mongoose
// 2. 导入
const mongoose = require("mongoose");

// 3. 连接mongodb                           数据库名称
mongoose.connect("mongodb://127.0.0.1:27017/bilibili");

// 4.设置回调
// 连接成功的回调 once事件回调只执行一次
mongoose.connection.once("open", () => {
  console.log("连接成功");
});
// 连接失败的回调
mongoose.connection.on("error", () => {
  console.log("连接失败");
});
// 连接关闭的回调
mongoose.connection.on("close", () => {
  console.log("连接关闭");
});
