// 1. 导入http模块
const http = require("http");

// 2.创建服务对象
const server = http.createServer((request, response) => {
  // 获取请求对象
  //   console.log(request);
  // 获取请求方法
  //   console.log(request.method);
  // 获取请求url
  //   console.log(request.url);
  // 获取HTTP协议版本
  //   console.log(request.httpVersion);
  // 获取请求头
  //   console.log(request.headers);
  let body = "";
  request.on("data", (data) => {
    body += data; // 拼接请求体
  });

  // 设置响应体
  request.on("end", () => {
    console.log(body);
    response.end("hello world"); // 设置响应体
  });
});

// 3. 监听端口，启动服务
server.listen(9000, () => {
  console.log("服务启动成功");
});
