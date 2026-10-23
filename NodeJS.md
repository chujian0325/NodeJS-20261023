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

# 文件操作与模块化编程
读取文件
```js
const fs = require('fs');
fs.readFile('文件路径', '编码格式', (err, data) => {
  if (err) {
    console.log('读取文件失败');
  } else {
    console.log(data);
  }
});

var fs = require('fs');
fs.readFile('a.txt', 'utf8', function (err, data) {
    if (err) throw err;
    console.log(err); // null
    console.log(data); // 你好
})
```
写入文件，如果文件不存在，则会创建文件，如果文件存在，则会覆盖文件
```js
const fs = require('fs');
fs.writeFile('文件路径', '写入内容', '编码格式', (err) => {
  if (err) {
    console.log('写入文件失败');
  } else {
    console.log('写入文件成功');
  }
});

var fs = require('fs');
fs.writeFile('test.txt', 'Hello World!', function (err) {
    if (err) throw err;
    console.log('File saved!');
})
```
追加文件：先读后写
```js
var fs = require('fs');
fs.readFile('a.txt', 'utf8', function (err, data) {
    var newData = data + 'hello';
    fs.writeFile('a.txt', newData, function (err) {
        console.log('追加成功');
    })
})

```