/**
 * 创建一个http服务，端口9000，满足如下需求
 * GET /index.html               返回 page/index.html文件
 * GET /css/app.css              返回 page/css/app.css文件
 * GET /js/app.js                返回 page/js/app.js文件
 * GET /images/logo.png          返回 page/images/logo.png文件
 */

const http = require("http");
const fs = require("fs");
const server = http.createServer((request, response) => {
  // 获取请求url路径
  let { pathname } = new URL(request.url, "http://127.0.0.1");
  //   拼接文件路径
  let filePath = __dirname + "/page" + pathname;
  //   读取文件fs，使用异步
  fs.readFile(filePath, (err, data) => {
    if (err) {
      response.statusCode = 404;
      response.end("Not Found");
      return;
    }
    response.end(data);
  });
});

server.listen(9000, () => {
  console.log("服务器启动成功");
});
