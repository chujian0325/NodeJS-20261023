const http = require("http");

const server = http.createServer((request, response) => {
  // 设置响应头
  response.setHeader("Content-Type", "text/html;charset=utf-8");
  let method = request.method;
  let { pathname } = new URL(request.url, "http://127.0.0.1:9000");
  if (method === "GET" && pathname == "/login") {
    response.end("登录页面");
  } else if (method === "GET" && pathname == "/register") {
    response.end("注册页面");
  } else {
    response.end("404 Not Found");
  }
});

server.listen(9000, () => {
  console.log("服务器启动成功~");
});
