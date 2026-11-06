const fs = require("fs");

const files = fs.readdirSync("./");

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
