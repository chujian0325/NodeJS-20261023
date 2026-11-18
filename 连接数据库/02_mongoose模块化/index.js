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
