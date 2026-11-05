// 导入fs模块
var fs = require("fs");
// 异步追加
fs.appendFile("test.txt", "三人行，必有我师!", function (err) {
  if (err) {
    console.error(err);
    return;
  }
});

// 同步追加
fs.appendFileSync("data.txt", "text");
// 或者
fs.writeFile("test.txt", "今天是2026年11月5日", { flag: "a" }, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("追加成功!");
});
