/**
 * 需求：搭建http服务，响应一个4行3列的表格
 * 表格隔行变色
 * 点击单元格高亮
 */

const http = require("http");
const fs = require("fs");
const server = http.createServer((request, response) => {
  // 读取html文件
  let html = fs.readFileSync(__dirname + "/5-table.html");
  response.end(html);
});

server.listen(9000, () => {
  console.log("服务器启动成功");
});
