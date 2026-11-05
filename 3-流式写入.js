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
