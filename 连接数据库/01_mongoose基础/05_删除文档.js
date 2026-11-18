// 1. 安装 npm i mongoose
// 2. 导入
const mongoose = require("mongoose");
const { Schema } = mongoose;

// 3. 连接mongodb                           数据库名称
mongoose.connect("mongodb://127.0.0.1:27017/bilibili");

// 4.设置回调
// 连接成功的回调 once事件回调只执行一次
mongoose.connection.once("open", async () => {
  console.log("连接成功");
  // 5. 创建文档结构对象
  // 设置集合中，文档的属性以及属性值的类型
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

  // 6. 创建模型对象：对文档操作的封装对象
  let BookModel = mongoose.model("novel", BookSchema);
  // 7. 删除一条数据
  // const res = await BookModel.deleteOne({ _id: "6afcff3fa5f1152875d42564" });
  // console.log("删除", res);
  // console.log(res.deletedCount); // 1=成功，0=没找到匹配数据
  // 8. 删除多条数据（批量删除）
  const res = await BookModel.deleteMany({ author: "吴承恩" });
  console.log("删除多条数据（批量删除）", res);
});
// 连接失败的回调
mongoose.connection.on("error", () => {
  console.log("连接失败");
});
// 连接关闭的回调
mongoose.connection.on("close", () => {
  console.log("连接关闭");
});
