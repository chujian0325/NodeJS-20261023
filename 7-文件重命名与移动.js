const fs = require("fs");

fs.rename("./output.txt", "hello.txt", (err) => {
  if (err) {
    console.log("重命名失败");
    return;
  }
  console.log("重命名成功");
});

// 移动，目标位置必须存在，否则会报错
fs.rename("./hello.txt", "./move/hello.txt", (err) => {
  if (err) {
    console.log("重命名失败");
    return;
  }
  console.log("重命名成功");
});
