# Node本地环境搭建及使用

1. 下载安装包
   https://nodejs.org/zh-cn/download/
2. 安装
   双击安装包，按照提示进行安装
3. 验证安装
   打开命令行，输入node -v，回车，如果显示版本号，则说明安装成功
4. 使用
   1. 创建一个文件夹，作为项目文件夹
   2. 在项目文件夹中创建一个js文件，作为入口文件
   3. 在js文件中编写代码
   4. 在命令行中进入项目文件夹
   5. 输入node 文件名.js，回车，即可运行代码
      Node注意：
5. Node中是不能操作DOM和BOM的，因为Node中没有DOM和BOM，可以使用console和定时器API
6. 顶级对象是global，而不是window，也可以用gobalThis来访问顶级对象global, globalThis === global

# fs模块

## 读取文件

fs模块可以实现与硬盘的交互，例如文件的创建、删除、重命名、移动，文件的读写，还有文件夹的相关操作

### 读取文件

```js
const fs = require("fs");
/**
 * fs.readFile(path[, options], callback)
 */

var fs = require("fs");
fs.readFile("a.txt", function (err, data) {
  if (err) return console.log(err);
  console.log(data);
});
```

### 流式读取

```js
// 1、引入fs
const fs = require("fs");
// 2、创建可读流
const rs = fs.createReadStream("./output.txt");
// 3、绑定data事件
rs.on("data", (chunk) => {
  console.log(chunk);
});
// 4. 绑定end事件
rs.on("end", () => {
  console.log("读取完成");
});
```

### 读取文件场景

- 电脑开机
- 程序运行
- 编辑器打开文件
- 查看图片
- 播放视频
- 播放音乐
- Git查看日志
- 上传文件
- 查看聊天记录

## 写入文件

如果文件不存在，则会创建文件，如果文件存在，则会覆盖文件

```js
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
fs.writeFile("test.txt", "三人行，必有我师焉!", function (err) {});

// 同步写入
fs.writeFileSync("data.txt", "text");
```

## 追加文件

```js
var fs = require("fs");
fs.appendFile("test.txt", "你好呀", (err) => {});

// 同步追加
fs.appendFileSync("data.txt", "text");

// 或者
fs.writeFile("test.txt", "今天是2026年11月5日", { flag: "a" }, (err) => {});
```

## 流式写入

适用于大文件写入或者频繁写入，可以减少文件打开关闭的次数，提高写入效率

```js
// 1. 引入fs
var fs = require("fs");
// 2. 创建写入流对象
const ws = fs.createWriteStream("output.txt");
// 3. 写入数据
ws.write("hello world\r\n");
ws.write("hello nodejs\r\n");
ws.write("hello javascript\r\n");
// 4. 关闭流
ws.close();
```

## 写入文件的场景

- 下载文件
- 安装软件
- 保存程序日志
- 编辑器保存文件
- 视频录制
  当需要持久化保存数据时，应该想到文件写入

## 文件重命名与移动

```js
// 重命名
fs.rename("./output.txt", "hello.txt", (err) => {});
// 移动，目标位置必须存在，否则会报错
fs.rename("./hello.txt", "./move/hello.txt", (err) => {});
```

## 删除文件

```js
fs.unlink("./a.txt", (err) => {});
fs.rm("./data.txt", (err) => {});
```

## 文件夹操作

### 创建文件夹

```js
fs.mkdir("./page", (err) => {});
fs.mkdirSync("./page", (err) => {});
// 递归创建文件夹
fs.mkdir("./page/page1/page2", { recursive: true }, (err) => {});
```

### 读取文件夹

```js
fs.readdir("./page", (err, files) => {});
fs.readdirSync("./page", (err, files) => {});
```

### 删除文件夹

```js
fs.rmdir("./page", (err) => {});
// 递归删除
fs.rm("./page", { recursive: true }, (err) => {});
```

## 查看资源状态

```js
fs.stat("./a.txt", (err, stats) => {});
fs.statSync("./a.txt", (err, stats) => {});
```

结果值对象结构

- size 文件大小
- birthtime 创建时间
- mtime 修改时间
- isFile 是否是文件
- isDirectory 是否是文件夹

## 路径问题

- 相对路径

```js
// 直接写文件名不写./，则默认为相对路径
./  // 当前目录
../ // 上一级
```

- 绝对路径

```js
D:/Program Files/nodejs/node.exe // windows
/Users/xxx/Desktop/NodeJS/NodeJS.md // mac
/usrs/xxx/Desktop/NodeJS/NodeJS.md // linux
```

```js
__dirname; // 获取当前文件所在目录，输出的是绝对路径
```

## 获取当前工作目录

```js
process.cwd();
```

- process.cwd() 获取当前工作目录

## fs文件批量重命名

```js
const fs = require("fs");

const files = fs.readdirSync("./fs");

files.forEach((item) => {
  let data = item.split("-");
  let [num, name] = data;
  if (num < 10) {
    num = "0" + num;
  }
  // 创建新的文件名
  let newName = `${num}-${name}`;
  // 重命名
  fs.renameSync(`./fs/${item}`, `./fs/${newName}`);
});
```

# path模块

path模块提供了操作路径的功能

```js
path.resolve(__dirname, "./a.txt"); // 获取绝对路径(常用)
path.join(__dirname, "./a.txt"); // 获取相对路径
path.sep; // 获取当前操作系统的路径分隔符，windows是\，mac和linux是/
path.parse(__dirname); // 获取路径信息对象
path.basename(__dirname); // 获取文件名
path.dirname(__dirname); // 获取文件所在目录
path.extname(__dirname); // 获取文件扩展名
```

# Http 模块

## 创建http服务

```js
// 1. 导入http模块
const http = require("http");

// 2.创建服务对象
const server = http.createServer((request, response) => {
  response.end("hello world"); // 设置响应体
});

// 3. 监听端口，启动服务
server.listen(9000, () => {
  console.log("服务启动成功");
});
```

## 注意事项

```js
1. 按Ctrl + C可以停止服务
2. 服务启动成功后，在浏览器地址栏输入localhost:9000或者http://127.0.0.1:9000可以访问
3. 更新代码需要重启后生效
4. 响应中文乱码问题，设置响应头
    response.setHeader("Content-Type", "text/plain;charset=utf-8"); // 设置响应头
5. 端口号被占用，报错Error: listen EADDRINUSE: address already in use :::9000
    解决方案：换一个端口号
6. http协议默认端口号80，http服务开发常用端口号3000,8080，8090,9000等
```

## 请求体

```js
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
```

## 提取http请求报文

```js
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
```

## 练习http请求

```js
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
```

## 响应设置

```js
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
```

## 练习http响应

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      td {
        padding: 20px, 40px;
      }
      tr:nth-child(odd) {
        background: rgb(23, 225, 54);
      }
      tr:nth-child(even) {
        background: pink;
      }
    </style>
  </head>
  <body>
    <table border="1">
      <tr>
        <td>test</td>
        <td>test</td>
        <td>test</td>
      </tr>
      <tr>
        <td>test</td>
        <td>test</td>
        <td>test</td>
      </tr>
      <tr>
        <td>test</td>
        <td>test</td>
        <td>test</td>
      </tr>
      <tr>
        <td>test</td>
        <td>test</td>
        <td>test</td>
      </tr>
    </table>
    <script>
      // 获取所有的td
      let tds = document.querySelectorAll("td");
      // 遍历所有的td
      tds.forEach((td) => {
        // 给每一个td绑定点击事件
        td.onclick = function () {
          this.style.background = "orange";
        };
      });
    </script>
  </body>
</html>
```

```js
/**
 * 需求：搭建http服务，响应一个4行3列的表格
 * 表格隔行变色
 * 点击单元格高亮
 */

const http = require("http");
const fs = require("fs");
const server = http.createServer((request, response) => {
  // 读取html文件，这样的好处：每次修改html文件，不用重启服务器
  let html = fs.readFileSync(__dirname + "/5-table.html");
  response.end(html);
});

server.listen(9000, () => {
  console.log("服务器启动成功");
});
```

**优化**

```js
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
```

## 静态资源服务

优化

```js
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
```

**导入和导出**

```js
// 导出
module.exports = {
  a: 1,
  b: 2,
};

// 导入
const { a, b } = require("./a.js");
```

默认导出

```js
export default { a, b };
```

设置别名

```js
import { a as a1, b as b1 } from "./a.js";
```

# Node脚手架-打造自己的脚手架工具

**什么是脚手架工具**
脚手架工具就是用来快速生成项目的工具，比如vue-cli、create-react-app等

脚手架工具的作用：

1. 快速生成项目结构
2. 快速安装依赖
3. 快速启动项目

脚手架工具的实现原理：

1. 使用命令行工具
2. 使用模板引擎
3. 使用文件系统

脚手架工具的实现步骤：

1. 创建一个文件夹，作为脚手架工具的根目录
2. 在根目录下创建一个package.json文件，用于描述脚手架工具的信息

自定义脚手架
