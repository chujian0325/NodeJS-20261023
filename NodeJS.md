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

# 模板引擎

模板引擎是分离用户界面和业务数据的一种技术

## EJS

EJS 是一套简洁的、高效的模板引擎，专门为 Node.js 环境设计

### 基本使用

```bash
npm i ejs
```

```js
const ejs = require("ejs");
const fs = require("fs");
let china = "中国";

let str = `我爱你${china}`;
let weather = "今天是晴天";
let str2 = fs.readFileSync("./01-EJS.html").toString();
// 使用ejs模板引擎
// let html = ejs.render("我爱你 <%= china %>", { china: china });
let html = ejs.render(str2, { china: china, weather });

console.log(html);
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
    <h2>我爱你 <%= china %></h2>
    <p><%= weather %></p>
  </body>
</html>
```

### 列表渲染

```js
const ejs = require("ejs");
const fs = require("fs");
let xiyou = ["唐僧", "孙悟空", "猪八戒", "沙僧"];

// let str = "<ul>";

// xiyou.forEach((item) => {
//   str += `<li>${item}</li>`;
// });

// str += "</ul>";
// console.log(str);

// EJS实现
let str2 = fs.readFileSync("./02.西游.html").toString();
let result = ejs.render(str2, { xiyou });
console.log(result);
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
    <h1>西游四人</h1>
    <ul>
      <% xiyou.forEach((item) => { %>
      <li><%= item%></li>
      <% }) %>
    </ul>
  </body>
</html>
```

### 条件渲染

```js
/**
 * 通过isLogin决定要输出的内筒
 * true 输出<span>欢迎回来</span>
 * false 输出<button>登录</button> <button>注册</button>
 */

const ejs = require("ejs");
let isLogin = false;

// 原生JS实现：
// if (isLogin) {
//   console.log("<span>欢迎回来</span>");
// } else {
//   console.log("<button>登录</button> <button>注册</button>");
// }

// EJS 实现：

let result = ejs.render(
  `
    <% if(isLogin){%>
    <span>欢迎回来</span>
    <% }else{%>
    <button>登录</button> <button>注册</button>
    <% }%>
    `,
  { isLogin: isLogin },
);
console.log(result);
```

### 在express中使用ejs

```js
const express = require("express");
const ejs = require("ejs");
const path = require("path");

const app = express();
// 1. 设置模板引擎为ejs
app.set("view engine", "ejs"); // 设置模板引擎为ejs
// 2. 设置模板文件所在的目录: 模板文件：具有模板内容的文件
app.set("views", path.resolve(__dirname, "./views")); // 设置模板文件所在的目录
app.get("/", (req, res) => {
  // 3.通过render方法渲染模板文件
  // 声明变量
  let title = "hello world";
  res.render("home", {
    title, // 传递给模板的变量
  });
});

app.listen(9000, () => {
  console.log("服务器启动成功");
});
```

home.ejs

```ejs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h2>测试</h2>
    <h3><%=title%></h3>
</body>
</html>
```

### express-generator

```bash
#  在当前目录下生成一个模板引擎为ejs的express项目
npx express-generator -e express-ejs-pro
cd express-ejs-pro
npm install
npm start
# 安装nodemon，可以实现免重启生效
npm i nodemon --save-dev

```

默认浏览器地址是http://127.0.0.1:3000
package.json

```json
"scripts": {
  "start": "nodemon ./bin/www"  // 这里要改下
},
```

### 处理文件上传报文

```bash
npm i formidable
```

```js
var express = require("express");
var router = express.Router();
const { formidable } = require("formidable");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// 显示网页（表单）
router.get("/portrait", function (req, res, next) {
  res.render("portrait");
});
// 处理文件上传
router.post("/portrait", function (req, res, next) {
  // 创建form对象
  const form = formidable({
    uploadDir: __dirname + "/../public/images", // 上传文件的存储目录
    keepExtensions: true, // 保留文件扩展名
  });
  // 解析请求报文
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    // res.json({ fields, files });
    // console.log(fields);
    console.log(files);
    // 服务器保存该图片的访问url，将来将此数据保存在数据库中
    // http://127.0.0.1:3000/images/f16x7bawge02rfn4eydqyhq3p.png
    let url = "/images/" + files.portrait[0].newFilename;
    res.send(url);
  });
});

module.exports = router;
```

# 记账本

```bash
npx express-generator -e account-pro
npm i nodemon
npm i
npm start
npm i lowdb@1.0.0 // 数据存储，通过json文件存储
npm i shortid // 生成随机id
npm i mongoose // 数据库
npm i moment // 时间处理
```

lowdb使用

````js
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults
db.defaults({ posts: [], user: {} })
  .write()

// Add a post
db.get('posts')
  .push({ id: 1, title: 'lowdb is awesome'})
  .write()

// Set a user using Lodash shorthand syntax
db.set('user.name', 'typicode').write()
// 获取数据
db.get('posts').value()
// 删除数据, 返回结果为被删除的数据
let delItem = db.get('posts').remove({ id: '3' }).write()
// 获取单条数据
db.get('posts').find({ id: '3' }).value()
// 更新数据
db.get('posts').find({ id: '3' }).assign({ title: 'lowdb is awesome' }).write()```
````

# mongoDB使用

mongoDB有三个概念：数据库、集合、文档
数据库：是一个数据仓库，数据库服务下可以创建很多数据仓库，数据库中可以存放很多集合
集合：集合是数据库中存放文档的地方，一个数据库可以包含多个集合，集合类似于数组
文档：文档是集合中的数据，一个集合可以包含多个文档，文档类似于对象
https://www.mongodb.com/try/download/community

```bash
# 先拉mongodb源
brew tap mongodb/brew
brew trust mongodb/brew

brew install mongodb-community@8.0
# 启动服务
brew services start mongodb-community@8.0
# 关闭服务
brew services stop mongodb-community@8.0
# 连接
mongosh
# 显示所有的数据库
show dbs
```

## 数据库命令

```bash
# 显示所有的数据库
show dbs
# 切换到指定的数据库
use 数据库名
# 显示当前所在的数据库
db
# 删除当前数据库
use 数据库名
db.dropDatabase()
```

## 集合命令

```bash
# 创建集合
db.createCollection("集合名")
# 显示当前数据库中的所有集合
show collections
# 删除集合
db.集合名.drop()
# 重命名集合
db.集合名.renameCollection('新名称')
```

## 文档命令

```bash
# 插入文档
db.集合名.insert(文档对象)
# 查询文档
db.集合名.find(查询条件)
# _id是mongodb自动生成的唯一编号，用来唯一标识文档
# 查询全部文档
db.user.find()

# 更新文档
db.集合名.update(查询条件, 新的文档)
db.集合名.update({name: '张三'}, {$set: {age: 20}})

# 删除文档
db.集合名.remove(查询条件)
```

# Mongoose使用

mongoose是Node.js中连接MongoDB的驱动程序，它提供了对MongoDB的便捷操作
https://mongoosejs.com/

```bash
npm install mongoose
```

## 基础使用

```javascript
// 1. 安装 npm i mongoose
// 2. 导入
const mongoose = require("mongoose");

// 3. 连接mongodb                           数据库名称
mongoose.connect("mongodb://127.0.0.1:27017/bilibili");

// 4.设置回调
// 连接成功的回调 once事件回调只执行一次
mongoose.connection.once("open", () => {
  console.log("连接成功");
});
// 连接失败的回调
mongoose.connection.on("error", () => {
  console.log("连接失败");
});
// 连接关闭的回调
mongoose.connection.on("close", () => {
  console.log("连接关闭");
});
```

## 创建

```js
// 1. 安装 npm i mongoose
// 2. 导入
const mongoose = require("mongoose");
const { Schema } = mongoose;

// 3. 连接mongodb                           数据库名称
mongoose.connect("mongodb://127.0.0.1:27017/bilibili");

// 4.设置回调
// 连接成功的回调 once事件回调只执行一次
mongoose.connection.once("open", () => {
  console.log("连接成功");
  // 5. 创建文档结构对象
  // 设置集合中，文档的属性以及属性值的类型
  let BookSchema = new Schema({
    name: String,
    author: String,
    price: Number,
  });

  // 6. 创建模型对象：对文档操作的封装对象
  let BookModel = mongoose.model("books", BookSchema);
  // 7. 新增
  BookModel.create({
    name: "西游记",
    author: "吴承恩",
    price: 20.34,
  });
});
// 连接失败的回调
mongoose.connection.on("error", () => {
  console.log("连接失败");
});
// 连接关闭的回调
mongoose.connection.on("close", () => {
  console.log("连接关闭");
});
```

## 字段类型

```js
// 1. 安装 npm i mongoose
// 2. 导入
const mongoose = require("mongoose");
const { Schema } = mongoose;

// 3. 连接mongodb                           数据库名称
mongoose.connect("mongodb://127.0.0.1:27017/bilibili");

// 4.设置回调
// 连接成功的回调 once事件回调只执行一次
mongoose.connection.once("open", () => {
  console.log("连接成功");
  // 5. 创建文档结构对象
  // 设置集合中，文档的属性以及属性值的类型
  let BookSchema = new Schema({
    name: String,
    author: String,
    price: Number,
    is_hot: Boolean,
    tags: Array,
    pub_time: Date,
    test: mongoose.Schema.Types.Mixed, // 任意类型
  });

  // 6. 创建模型对象：对文档操作的封装对象
  let BookModel = mongoose.model("books", BookSchema);
  // 7. 新增
  BookModel.create({
    name: "西游记",
    author: "吴承恩",
    price: 20.34,
    is_hot: true,
    tags: ["历史", "政治"],
    pub_time: new Date(),
    test: "test",
  });
});
// 连接失败的回调
mongoose.connection.on("error", () => {
  console.log("连接失败");
});
// 连接关闭的回调
mongoose.connection.on("close", () => {
  console.log("连接关闭");
});
```

## 字段值验证

mongoose提供了很多内置的验证器，比如：required、minlength、maxlength、enum、min、max等

```js
// 必填项
title: {
  type: String,
  required: true
}
// 默认值
title: {
  type: String,
  default: "默认值"
}
// 枚举值
status: {
  type: String,
  enum: ["published","draft"]
}
// 唯一值
title: {
  type: String,
  unique: true // unique: true 唯一值，需要重建集合才能有效果
}


let BookSchema = new Schema({
  name: {
    type: String,
    required: true, // 必填
  },
  author: {
    type: String,
    default: "吴承恩", // 默认值
  },
  style: {
    type: String,
    enum: ["言情", "科幻", "历史"], // 枚举值
  },
  price: Number,
});
```

## 删除文档

```js
// 删除一条数据
const res = await BookModel.deleteOne({ _id: "6afcff3fa5f1152875d42564" });
console.log("删除", res);
console.log(res.deletedCount); // 1=成功，0=没找到匹配数据

// 删除多条数据（批量删除）
const res = await BookModel.deleteMany({ author: "吴承恩" });
console.log("删除多条数据（批量删除）", res);
```

## 更新文档

```js
// 更新一条，参数1：筛选条件，参数2：更新内容
const res = await BookModel.updateOne(
  { _id: "6afd04d7da6447bac19b6994" },
  { price: "39.9" },
);
console.log("更新一条", res);

// 更新多条，参数1：筛选条件，参数2：更新内容
const res2 = await BookModel.updateMany({ name: "西游记" }, { price: "59.9" });
console.log("更新多条", res2);
```

## 读取文档

```js
// 7. 读取文档：参数1：筛选条件，参数2：读取内容
BookModel.findOne(
  { _id: "6afd04d7da6447bac19b6994" },
  { name: 1, author: 1, price: 1, _id: 0 },
).then((result) => {
  console.log(result); // { name: '西游记', author: '吴承恩', price: 59.9 }
});

// 8.根据id读取文档
BookModel.findById("6afd04d7da6447bac19b6994").then((result) => {
  console.log(result); // { _id: 6afd04d7da6447bac19b6994, name: '西游记', author: '吴承恩', price: 59.9 }
});

// 9. 批量获取，参数1：筛选条件
BookModel.find({ author: "吴承恩" }).then((result) => {
  console.log(result); // [ { _id: 6afd04d7da6447bac19b6994, name: '西游记', author: '吴承恩', price: 59.9 } ]
});
// 10. 获取所有文档
BookModel.find().then((result) => {});
```

## 条件控制

**运算符**
在mongodb中，不能使用>、<、>=、<=、!== 等比较运算符，需要使用$gt、$lt、$gte、$lte、$ne等运算符代替

| > | $gt | 大于 |
| < | $lt | 小于 |
| = | $gte | 大于等于 |
| <= | $lte | 小于等于 |
| !== | $ne | 不等于 |

```js
// 11. 条件查询
BookModel.find({ price: { $gt: 50 } }).then((result) => {
  console.log(result); //筛选价格大于50的
});
```

**逻辑运算符**：$or、$and、$not、$nor

```js
BookModel.find({ $or: [{ price: { $gt: 50 } }, { author: "吴承恩" }] }).then(
  (result) => {
    console.log(result);
  },
);
```

**正则表达式**
用来模糊查询

```js
BookModel.find({ name: /传/ }).then((result) => {
  console.log(result); // 筛选名字中包含“传”的
});
BookModel.find({ name: new RegExp("传") }).then((result) => {
  console.log(result); // 筛选名字中包含“传”的
});
```

## 个性化读取

**字段筛选**
0: 不要的字段
1: 要显示的字段

```js
// 只显示name和author字段
let result = await BookModel.find().select({
  name: 1,
  author: 1,
  _id: 0,
});
```

**数据排序**
1: 升序
-1: 降序

```js
// 按照价格降序排序
let result2 = await BookModel.find().sort({
  price: -1,
});
```

**数据截取**
skip: 跳过多少条
limit: 截取多少条

```js
// 数据截取: skip(跳过多少条) limit(限制输出多少条)，分页或者截取第几条到第几条的数据
let result3 = await BookModel.find().limit(2);
```

## mongoose模块化

config/config.js

```js
// 配置文件
module.exports = {
  dbHost: "127.0.0.1",
  dbName: "bilibili",
  dbPort: 27017,
};
```

db/db.js

```js
/**
 *
 * @param {*} success  数据库连接成功的回调
 * @param {*} error  数据库连接失败的回调
 */
module.exports = function (success, error) {
  // 1. 安装 npm i mongoose
  // 2. 导入
  const mongoose = require("mongoose");
  const { dbHost, dbName, dbPort } = require("../config/config");

  // 3. 连接mongodb                           数据库名称
  mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`);

  // 4.设置回调
  // 连接成功的回调 once事件回调只执行一次
  mongoose.connection.once("open", () => {
    success();
  });
  // 连接失败的回调
  mongoose.connection.on("error", () => {
    error();
  });
  // 连接关闭的回调
  mongoose.connection.on("close", () => {});
};
```

创建models/BookModel.js

```js
const mongoose = require("mongoose");

// 创建文档结构对象
// 设置集合中，文档的属性以及属性值的类型
let BookSchema = new mongoose.Schema({
  name: String,
  author: String,
  price: Number,
});

// 创建模型对象：对文档操作的封装对象
let BookModel = mongoose.model("books", BookSchema);

// 暴露模型对象
module.exports = BookModel;
```

index.js

```js
// 导入db
const db = require("./db/db");
// 导入BookModel
const BookModel = require("./models/BookModel");

// 调用db
db(
  () => {
    console.log("连接成功........");
    BookModel.create({
      name: "node.js",
      price: 100,
      author: "张三",
    });
  },
  () => {
    console.log("连接失败.......");
  },
);
```

## Mongoose图形化工具：Navicat for MongoDB

https://www.navicat.com.cn/products这里下载中文版

# json-server

```bash
npm i json-server -g
# 创建db.json文件，编写数据结构
json-server --watch db.json
```

# 接口测试工具

apipost
apifox
postman

# 会话控制

http是无状态的，无法区分请求是否来自同一个客户端，所以需要会话控制

常见的会话控制有三种：

- cookie
- session
- token

## cookie

cookie是http服务器发送到用户浏览器并保存在本地的一小块数据
cookie数据始终在同源的http请求中携带，在浏览器和服务器之间传递
cookie数据的大小不能超过4KB
cookie是按照域名区分的，不同域名下的cookie是不能互相访问的
浏览器向服务器发送请求时，会自动将当前域名下可用的cookie值添加到请求头中，发送给服务器

特点：

1. 会在浏览器关闭的时候销毁
2. 不同浏览器的cookie是不共享的

### 在express中设置cookie

```js
app.get("/setCookie", (req, res) => {
  res.cookie("name", "zhangsan");
  res.cookie("name", "zhangsan", {
    maxAge: 1000 * 60 * 60 * 24 * 7,
  }); // 设置cookie的过期时间，即使把浏览器关了，没到过期时间，再打开浏览器也是有效的
  res.send("设置cookie成功");
});
```

### 在express中获取cookie

```bash
npm i cookie-parser
```

```js
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.get("/getCookie", (req, res) => {
  console.log(req.cookies);
  res.send("获取cookie成功，欢迎", req.cookies.name);
});
```

### 在express中删除cookie

```js
app.get("/deleteCookie", (req, res) => {
  res.clearCookie("name");
  res.send("删除cookie成功");
});
```

## session

session是保存在服务器端的一块数据，保存当前访问用户的一些信息

### express中使用session

```bash
# connect-mongo可以连接数据库，并对数据库做一些操作，比如存储session到数据库中
npm i express-session connect-mongo
```

```js
const session = require("express-session");
const { MongoStore } = require("connect-mongo");

const app = express();
// 设置session中间件,
// 会自动在数据库中创建sessions集合，用于存储session数据
app.use(
  session({
    name: "sid", // 设置cookie的name，默认值是connect.sid
    secret: "atguigu", // 参与加密的字符串，又称签名、加盐
    saveUninitialized: false, // 是否为每次请求都设置一个cookie用来存储session的id
    resave: true, // 是否每次请求都重新保存session，默认是false
    // 设置session的存储位置
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/bilibili",
    }),
    cookie: {
      httpOnly: true, // 开启后，前端无法通过js操作
      maxAge: 24 * 60 * 60 * 1000, // 设置sessionID的过期时间
    },
  }),
);
```

### session创建、销毁、读取

```js
const express = require("express");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const app = express();
// 会自动在数据库中创建sessions集合，用于存储session数据
app.use(
  session({
    name: "sid", // 设置cookie的name，默认值是connect.sid
    secret: "atguigu", // 参与加密的字符串，又称签名、加盐
    saveUninitialized: false, // 是否为每次请求都设置一个cookie用来存储session的id
    resave: true, // 是否每次请求都重新保存session，默认是false
    // 设置session的存储位置
    store: new MongoStore({
      mongoUrl: "mongodb://localhost:27017/bilibili",
      mongoOptions: {
        serverSelectionTimeoutMS: 3000, // 3秒连不上mongo直接报错，防止接口卡死
      },
    }),
    cookie: {
      httpOnly: true, // 开启后，前端无法通过js操作
      maxAge: 24 * 60 * 60 * 1000, // 设置sessionID的过期时间
    },
  }),
);

app.get("/", (req, res) => {
  res.send("hello world");
});
// 设置session信息，返回登录成功
app.get("/login", (req, res) => {
  // http://127.0.0.1:3000/login?username=admin&password=admin，返回登录成功
  if (req.query.username == "admin" && req.query.password == "admin") {
    // 设置session信息
    req.session.username = "admin";
    req.session.uid = "agshjfkfd";
    res.send("登录成功");
  } else {
    res.send("登录失败");
  }
});

// session读取
app.get("/cart", (req, res) => {
  // 检测session是否存在用户数据
  if (req.session.username) {
    res.send("欢迎" + req.session.username + "来到购物车页面");
  } else {
    res.send("请先登录");
  }
});

// session的销毁
app.get("/logout", (req, res) => {
  // 销毁session
  req.session.destroy((err) => {
    if (err) {
      res.send("退出失败");
    } else {
      res.send("退出成功");
    }
  });
});
app.listen(3000, () => {
  console.log("服务器在3000端口启动");
});
```

## session和cookie的区别

1. cookie是存储在客户端，session是存储在服务器端
2. cookie以明文形式存在客户端，不安全，session存在服务端，相对安全
3. cookie设置内容过多会增大报文体积，影响传输效率，session存储在服务器端，占用服务器资源，只通过cookie存储sessionid，不会影响传输效率
4. cookie有有效期，session没有有效期，关闭浏览器后session会失效
5. cookie可以设置httpOnly，防止js操作cookie，session无法设置httpOnly
6. 浏览器限制单个cookie保存的数据不能超过4K，而且单个域名下的存储数量也有限制，session没有限制

# token

Token的特点:

- 服务端压力更小
  - 数据存储在客户端
- 相对更安全
  - 数据加密
  - 可以避免CSRF(跨站请求伪造)
- 扩展性更强
  - 服务间可以共享
  - 增加服务节点更简单
