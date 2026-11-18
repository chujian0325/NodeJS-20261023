/**
 *
 * @param {*} success  数据库连接成功的回调
 * @param {*} error  数据库连接失败的回调
 */
module.exports = function (success, error) {
  // 1. 安装 npm i mongoose
  // 2. 导入
  const mongoose = require("mongoose");
  const { dbHost, dbName, dbPort } = require("../config/config");

  // 3. 连接mongodb                           数据库名称
  mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`);

  // 4.设置回调
  // 连接成功的回调 once事件回调只执行一次
  mongoose.connection.once("open", () => {
    success();
  });
  // 连接失败的回调
  mongoose.connection.on("error", () => {
    error();
  });
  // 连接关闭的回调
  mongoose.connection.on("close", () => {});
};
