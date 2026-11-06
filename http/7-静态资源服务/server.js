/**
 * 创建一个http服务，端口9000，满足如下需求
 * GET /index.html               返回 page/index.html文件
 * GET /css/app.css              返回 page/css/app.css文件
 * GET /js/app.js                返回 page/js/app.js文件
 * GET /images/logo.png          返回 page/images/logo.png文件
 */

const http = require("http");
const fs = require("fs");
const path = require("path");
let mimes = {
  html: "text/html",
  css: "text/css",
  js: "text/javascript",
  png: "image/png",
  jpg: "image/jpeg",
  gif: "image/gif",
  mp4: "video/mp4",
  mp3: "audio/mpeg",
  json: "application/json",
};
const server = http.createServer((request, response) => {
  // 获取请求url路径
  let { pathname } = new URL(request.url, "http://127.0.0.1");
  //   拼接文件路径
  let filePath = __dirname + "/page" + pathname;
  //   读取文件fs，使用异步
  fs.readFile(filePath, (err, data) => {
    if (err) {
      response.setHeader("Content-Type", "text/html;charset=utf-8");
      response.statusCode = 500;
      response.end("文件读取失败");
      return;
    }
    // 获取文件后缀名，根据后缀名设置Content-Type
    let ext = path.extname(filePath).slice(1);
    // 获取对应类型
    let type = mimes[ext];
    if (type) {
      if (ext === "html") {
        response.setHeader("Content-Type", type + ";charset=utf-8");
      } else {
        response.setHeader("Content-Type", type);
      }
    } else {
      response.setHeader("Content-Type", "application/octet-stream");
    }
    response.end(data);
  });
});

server.listen(9000, () => {
  console.log("服务器启动成功");
});
