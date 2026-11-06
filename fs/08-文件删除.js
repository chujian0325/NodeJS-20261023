const fs = require("fs");

fs.unlink("./a.txt", (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("删除成功");
});

fs.rm("./data.txt", (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("删除成功");
});
