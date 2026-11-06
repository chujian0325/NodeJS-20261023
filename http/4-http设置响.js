const http = require("http");

const server = http.createServer((request, response) => {
  // 设置响应状态码
  response.statusCode = 200;
  // 设置响应状态的描述
  response.statusMessage = "OK";
  // 响应头
  response.setHeader("Content-Type", "text/html;charset=utf-8");
  response.setHeader("Server", "Node Js");
  // 设置多个重名的响应头
  response.setHeader("test", ["a", "b", "c"]);
  // 设置响应体
  response.write("Do");
  response.write("you");
  response.write("love");
  response.write("me");
  response.end("hello world"); //输出Doyoulovemehello world
});

server.listen(9000, () => {
  console.log("服务器启动成功");
});
