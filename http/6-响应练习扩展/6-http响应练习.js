/**
 * 需求：搭建http服务，响应一个4行3列的表格
 * 表格隔行变色
 * 点击单元格高亮
 */

const http = require("http");
const fs = require("fs");
const server = http.createServer((request, response) => {
  // 获取请求url路径
  let { pathname } = new URL(request.url, "http://127.0.0.1");
  if (pathname === "/") {
    // 读取html文件
    let html = fs.readFileSync(__dirname + "/6-table.html");
    response.end(html);
  } else if (pathname === "/6-index.css") {
    let css = fs.readFileSync(__dirname + "/6-index.css");
    response.end(css);
  } else if (pathname === "/6-index.js") {
    let js = fs.readFileSync(__dirname + "/6-index.js");
    response.end(js);
  } else {
    response.statusCode = 404;
    response.end("404");
  }
});

server.listen(9000, () => {
  console.log("服务器启动成功");
});
