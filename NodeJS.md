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

# 设置MIME类型

MIME(媒体类型)是一种标准，用来表示文档、文件或者字节流的性质和格式
http服务可以设置响应头Content-Type来告诉浏览器返回的数据类型
以下是常见文件对应的MIME类型

```js
html: text / html;
css: text / css;
js: text / javascript;
png: image / png;
jpg: image / jpeg;
gif: image / gif;
mp4: video / mp4;
mp3: audio / mpeg;
json: application / json;
```

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
  if (request.method !== "GET") {
    response.statusCode = 405;
    response.end("请求方法不允许");
    return;
  }
  // 获取请求url路径
  let { pathname } = new URL(request.url, "http://127.0.0.1");
  //   拼接文件路径
  let filePath = __dirname + "/page" + pathname;
  //   读取文件fs，使用异步
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err);
      switch (err.code) {
        case "ENOENT":
          response.statusCode = 404;
          response.end(<h1>404 Not Found</h1>);

        case "EPERM":
          response.statusCode = 403;
          response.end(<h1>403 Forbidden</h1>);

        default:
          response.statusCode = 500;
          response.end("服务器错误");
      }
      response.setHeader("Content-Type", "text/html;charset=utf-8");
      response.statusCode = 500;
      response.end("文件读取失败");
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
```

# 模块化导入和导出

导出

```js
module.exports = {
  a: 1,
  b: 2,
};
// 默认导出
export default { a, b };

/**
 * module.exports 可以暴露任意数据
 * 不能使用exports=value的形式暴露数据，模块内module和exports的隐式关系：exports = module.exports = {}
 */
```

导入

```js
const { a, b } = require("./a.js");
/**
 * 注意：
 * 1. require ./不能省略
 * 2. js、json文件后缀名可以省略，如果同名，先找js文件，再找json文件
 * 3. 如果导入其他类型的文件，会以js文件进行处理
 * 4. 如果导入的路径是个文件夹，则会
 *    首先检测该文件夹下package.json文件中main属性对应的文件，如果存在则导入，反之如果文件不存在会报错。
 *    如果main属性不存在，或者package.json不存在，则会尝试导入文件夹下的index.js和index.json，如果还是没找到，就会报错
 * 5. 导入node.js内置模块时，直接require模块的名字即可，无需加./和../
 */
```

设置别名

```js
import { a as a1, b as b1 } from "./a.js";
```

# CommonJS规范

module.exports、exports以及require是CommonJS规范里面的内容，Node.js是实现了CommonJS模块化规范

# 包管理工具

一、概念介绍
1.1包是什么
『包』英文单词是package，代表了一组特定功能的源码集合

1.2包管理工具
管理『包』的应用软件，可以对「包」进行下载安装，更新，删除，上传等操作
借助包管理工具，可以快速开发项目，提升开发效率
包管理工具是一个通用的概念，很多编程语言都有包管理工具，所以掌握好包管理工具非常重要

1.3前端常用的包管理工具

- npm
- yarn
- cnpm

**npm**

1. npm 初始化包

```bash
npm init  // 初始化项目，生成package.json文件
/**
 *  npm init 命令的作用是将文件夹初始化为一个『包』，交互式创建 package.json 文件
 *  package.json是包的配置文件，每个包都必须要有 package.json
 *初始化的过程中还有一些注意事项:
 *  1.package name(包名)不能使用中文、大写，默认值是文件夹的名称，所以文件夹名称也不能使用中文和大写
 *  2.version(版本号)要求x.x.x的形式定义,x必须是数字，默认值是1.0.0
 *  3.ISC证书与MIT证书功能上是相同的，关于开源证书扩展阅读http://www.ruanyifeng.com/blog/2011/05/how_to_choose_free_software_licenses.html
 *  4.package.json 可以手动创建与修改
 *  5.使用 npm init -y 或者 npm init--yes 速创建package.json
 */

```

2. 搜索包

```bash
npm search 包名
```

3. 安装包

```bash
npm install 包名
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

# Express

```bash
npm init
npm install express
```

## 基本使用

```js
// 1. 导入express
const express = require("express");

// 2. 创建应用对象
const app = express();

// 3. 创建路由规则
app.get("/home", (req, res) => {
  res.send("hello express");
});

// 4. 监听端口，启动服务
app.listen(3000, () => {
  console.log("服务已启动，端口号为80");
});
```

## express路由

路由是指如何定义请求的URL和处理请求的函数之间的映射关系
路由由三部分组成：请求方法、请求URL和处理函数
app.get()和app.post()分别定义了GET请求和POST请求的路由规则

```js
// 1. 导入express
const express = require("express");

// 2. 创建应用对象
const app = express();

// 3. 创建路由规则
app.get("/", (req, res) => {
  res.send("hello home");
});
app.get("/home", (req, res) => {
  res.send("hello express");
});
// 匹配所有请求方式，一般写在最后
app.all("/about", (req, res) => {
  res.send("hello about");
});
// 404兜底路由，放在所有路由最后！Express 5.3.0 官方正确捕获全部路由写法：`{*splat}`
app.all("{*splat}", (req, res) => {
  res.send("404 Not Found");
});

// 4. 监听端口，启动服务
app.listen(3000, () => {
  console.log("服务已启动，端口号为3000");
});
```

## 获取请求参数

```js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hello home");
});
app.get("/home", (req, res) => {
  console.log(req.method); // GET
  console.log(req.url); // /home
  console.log(req.httpVersion); // 1.1
  console.log(req.headers); // { host: 'localhost:3000', connection: 'keep-alive', ... }

  console.log(req.query); // { name: 'zhangsan', age: '20' }
  console.log(req.path); // /home
  res.send("hello express");
});

app.listen(3000, () => {
  console.log("服务已启动，端口号为3000");
});
```

## 获取路由参数

```js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hello home");
});
app.get("/home", (req, res) => {
  res.send("hello express");
});
app.get("/user/:id", (req, res) => {
  console.log(req.params); // { id: '123' }
  res.send("hello user");
});
```

## 响应设置

四、express响应设置
express框架封装了一些API来方便给客户端响应数据，并且兼容原生HTTP模块的获取方式

```js
//获取请求的路由规则
app.get("/response", (req, res) => {
  //1.express中设置响应的方式兼容HTTP模块的方式
  res.statusCode = 404;
  res.statusMessage = "xxx";
  res.setHeader("abc", "xyz");
  res.write("响应体");
  res.end("xxx");

  //2.express 的响应方法
  res.status(500); //设置响应状态码
  res.set("xxx", "yyy"); //设置响应头res.send('中文响应不乱码');//设置响应体

  //连贯操作
  res.status(404).set("xxx", "yyy").send("你好朋友");

  //3.其他响应
  res.redirect("http://atguigu.com"); //重定向
  res.download(__dirname + "/package.json"); //下载响应
  res.json({
    name: "why",
    age: 18,
  }); //响应 JSoN
  res.sendFile(__dirname + "/home.html"); //响应文件内容
});
```

# express中间件

1. 什么是中间件
   中间件(Middleware)本质是一个回调函数
   中间件函数可以像路由回调一样访问请求对象(request)，响应对象(response)
2. 中间件的作用
   中间件的作用就是使用函数封装公共操作，简化代码
3. 中间件的类型
   - 全局中间件
   - 路由中间件

## 定义全局中间件

每一个请求到达服务端之后都会执行全局中间件函数
声明中间件函数

```js
let recordMiddleware = function(request, response, next){
//实现功能代码
...
//执行next函数(当如果希望执行完中间件函数之后，仍然继续执行路由中的回调函数，必须调用next)
next();
}
```

## 全局中间件实践

```js
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

// 声明中间件函数
function log(req, res, next) {
  // 获取url和ip
  let { url, ip } = req;
  console.log(url, ip);
  // 将信息保存在access.log中，持续添加，所以用appendFile
  fs.appendFile(
    path.resolve(__dirname, "./access.log"),
    `${url} ${ip}\r\n`,
    (err) => {},
  );
  next();
}
// 使用全局中间件，这样每个请求都会经过这个中间件
app.use(log);
// 定义路由
app.get("/home", (req, res) => {
  res.send("home");
});
app.get("/admin", (req, res) => {
  res.send("admin");
});

app.all("{*splat}", (req, res) => {
  res.send("404 Not Found");
});

app.listen(9000, () => {
  console.log("http://127.0.0.1");
});
```

## 路由中间件实践

```js
const express = require("express");
const app = express();

// 声明路由中间件
function checkCodeMiddleware(req, res, next) {
  // 判断url是否有code = 521
  if (req.query.code == "521") {
    next();
  } else {
    res.send("没有权限");
  }
}

app.get("/admin", checkCodeMiddleware, (req, res) => {
  res.send("admin");
});
app.get("/setting", checkCodeMiddleware, (req, res) => {
  res.send("setting");
});

app.all("{*splat}", (req, res) => {
  res.send("404 Not Found");
});

app.listen(9000, () => {
  console.log("http://127.0.0.1");
});
```

## 静态资源中间件

```js
const express = require("express");
const app = express();
// 静态资源中间件设置,express.static的参数是静态资源的路径，它还会自动设置响应头MIME类型
app.use(express.static(__dirname + "/public"));

// 定义路由
app.get("/home", (req, res) => {
  res.send("home");
});

app.get("/admin", (req, res) => {
  res.send("admin");
});

app.all("{*splat}", (req, res) => {
  res.send("404 Not Found");
});

app.listen(9000, () => {
  console.log("http://127.0.0.1");
});
```

注意事项：

1. index.html文件为默认打开的资源
2. 如果静态资源与路由规则同时匹配，谁先匹配谁就响应（谁写在前面，优先执行谁）
3. 路由响应动态资源，静态资源中间件响应静态资源

# 获取请求体数据

express中没有内置获取请求体数据的中间件，需要使用第三方中间件body-parser

```js
/**
 * 按要求搭建http服务
 * GET /login 显示表单网页
 * POST /login 获取表单的【用户名】和【密码】请求体数据，并返回响应
 */
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.get("/login", (req, res) => {
  // res.send('表单页面')
  // 响应html文件
  res.sendFile(__dirname + "/01-form.html");
});
// 解析json格式的请求体数据
let jsonParser = bodyParser.json();

// 解析urlencoded格式的请求体数据
let urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post("/login", urlencodedParser, (req, res) => {
  res.send(`用户名：${req.body.username}，密码：${req.body.password}`);
});
app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
```

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <form action="http://127.0.0.1:9000/login" method="post">
      用户名：<input type="text" name="username" /><br />
      密码：<input type="password" name="password" /><br />
      <button>提交</button>
    </form>
  </body>
</html>
```

# 防盗链

```js
const express = require("express");
const app = express();

// 声明中间件
app.use((req, res, next) => {
  // 检测请求头中的 referrer 是否是127.0.01.0.1
  let referrer = req.get("referrer");
  if (referrer) {
    let url = new URL(referrer);
    let hostname = url.hostname;

    if (hostname !== "127.0.0.1") {
      res.status(403).send("非法盗链");
      return;
    }
  }
  next();
});

app.use(express.static(__dirname + "/public"));

app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
```

# 路由模块化

routes/homeRouter.js

```js
// 1. 导入express
const express = require("express");

// 2. 创建路由对象
const router = express.Router();

// 3. 挂载路由
router.get("/home", (req, res) => {
  res.send("前台首页");
});
router.get("/search", (req, res) => {
  res.send("内容搜索");
});

// 4. 导出路由对象
module.exports = router;
```

```js
const express = require("express");

const homeRouter = require("./routes/homeRouter");
const adminRouter = require("./routes/adminRouter");

const app = express();

app.use(homeRouter);
app.use(adminRouter);

app.all("{*splat}", (req, res) => {
  res.send("404 Not Found");
});

app.listen(9000, () => {
  console.log("http://127.0.0.1");
});
```
