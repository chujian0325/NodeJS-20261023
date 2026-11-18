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
  // 7. 设置输出字段（筛选）
  // let result = await BookModel.find().select({
  //   name: 1,
  //   author: 1,
  //   _id: 0,
  // });
  // console.log(result);

  // 8. 数据排序: 1升序 -1降序
  // let result2 = await BookModel.find().sort({
  //   price: -1,
  // })
  // console.log(result2);

  // 9. 数据截取: skip(跳过多少条) limit(限制输出多少条)，分页或者截取第几条到第几条的数据
  let result3 = await BookModel.find().limit(2);
  console.log(result3);
});
// 连接失败的回调
mongoose.connection.on("error", () => {
  console.log("连接失败");
});
// 连接关闭的回调
mongoose.connection.on("close", () => {
  console.log("连接关闭");
});
