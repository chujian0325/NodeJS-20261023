// 导入jwt
const jwt = require("jsonwebtoken");

// 创建（生成）token

// let token = jwt.sign(用户数据, 加密字符串, 配置对象);
let token = jwt.sign({ username: "admin" }, "bilibili", {
  expiresIn: 60 * 60 * 24 * 7, // 7天 单位是秒
});
console.log(token);

let t = "dkdkkdk";// 随便写的，模拟token
// 校验token
/**
 * 参数1：token
 * 参数2：加密字符串
 * 参数3：回调函数
 */
jwt.verify(t, "bilibili", (err, decoded) => {
  if (err) {
    console.log("校验失败");
    return;
  }
  console.log(decoded);
});
