const http = require("http");

// 创建服务对象
const server = http.createServer((request, response) => {
  // 实例化URL对象
  // http://127.0.0.1:9000/search?name=zs&age=10
  let url = new URL(request.url, "http://127.0.0.1:9000");
  // 过滤图标请求
  if (url.pathname === "/favicon.ico") {
    response.writeHead(204);
    response.end();
    return;
  }
  // 输出路径
  console.log("pathname", url.pathname);
  // 输出keyword
  console.log("name", url.searchParams.get("name")); // zs
  console.log("age", url.searchParams.get("age")); // 10
  response.end("hello world");
});

server.listen(9000, () => {
  console.log("服务启动成功");
});
