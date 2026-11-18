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
