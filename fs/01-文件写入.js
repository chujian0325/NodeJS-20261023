// 导入fs模块
var fs = require("fs");
/**
 * 写入
 * fs.writeFile(file, data[, options], callback)
 * file 文件名
 * data 写入的数据
 * options 写入的配置（可选）
 * callback 回调函数
 */
// 异步写入
fs.writeFile("test.txt", "三人行，必有我师!", function (err) {
  if (err) {
    console.error(err);
    return;
  }
  console.log("写入成功!");
});
console.log("程序执行完毕!");

// 同步写入
// fs.writeFileSync("data.txt", "text");
