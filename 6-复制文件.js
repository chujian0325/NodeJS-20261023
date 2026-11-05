const fs = require("fs");
const process = require("process");
// 方式1： readFileSync + writeFileSync
// let data = fs.readFileSync("./qqq.mp4");
// fs.writeFileSync("./qqq-1.mp4", data);
// console.log(process.memoryUsage()); //43565056 字节 41.5M

// 方式2： 流式操作 createReadStream + createWriteStream
// 这种方式更好，所占的资源少，取一点，写一点，每次只取一部分64K
let rs = fs.createReadStream("./qqq.mp4");
let ws = fs.createWriteStream("./qqq-2.mp4");
// rs.on("data", function (chunk) {
//   ws.write(chunk);
// });
// rs.on("end", function () {
//   console.log(process.memoryUsage()); //46120960 字节 43.98M
// });

rs.pipe(ws); // 简化写法
