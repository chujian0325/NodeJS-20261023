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
