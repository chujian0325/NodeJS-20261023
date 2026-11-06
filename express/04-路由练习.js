const express = require("express");
// 导入json文件
const data = require("./singer.json");
const app = express();

app.get("/", (req, res) => {
  res.send("hello home");
});
app.get("/singer/:id.html", (req, res) => {
  let { id } = req.params;
  let obj = data.find((item) => item.id == id);
  if (obj) {
    res.send(
      `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
        </head>
        <body>
          <div>${obj.name}</div>
          <image src=${obj.picUrl}/>
        </body>
      </html>`,
    );
  } else {
    res.sendStatus = 404;
    res.send("404 Not Found");
  }
});

app.listen(3000, () => {
  console.log("服务已启动，端口号为3000");
});
