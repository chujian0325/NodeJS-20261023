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
  // 7. 读取文档：参数1：筛选条件，参数2：读取内容
  // BookModel.findOne(
  //   { _id: "6afd04d7da6447bac19b6994" },
  //   { name: 1, author: 1, price: 1, _id: 0 },
  // ).then((result) => {
  //   console.log(result); // { name: '西游记', author: '吴承恩', price: 59.9 }
  // });

  // 8.根据id读取文档
  // BookModel.findById("6afd04d7da6447bac19b6994").then((result) => {
  //   console.log(result); // { _id: 6afd04d7da6447bac19b6994, name: '西游记', author: '吴承恩', price: 59.9 }
  // })

  // 9. 批量获取，参数1：筛选条件
  BookModel.find({ author: "吴承恩" }).then((result) => {
    console.log(result); // [ { _id: 6afd04d7da6447bac19b6994, name: '西游记', author: '吴承恩', price: 59.9 } ]
  });
  // 10. 获取所有文档
  // BookModel.find().then((result) => {}
});
// 连接失败的回调
mongoose.connection.on("error", () => {
  console.log("连接失败");
});
// 连接关闭的回调
mongoose.connection.on("close", () => {
  console.log("连接关闭");
});
