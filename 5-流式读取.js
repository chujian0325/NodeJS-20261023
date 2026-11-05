// 1、引入fs
const fs = require("fs");
// 2、创建可读流
const rs = fs.createReadStream("./output.txt");

// 3、绑定data事件

rs.on("data", (chunk) => {
  console.log(chunk);
});
// 4. 绑定end事件
rs.on("end", () => {
  console.log("读取完成");
});
