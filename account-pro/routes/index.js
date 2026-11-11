var express = require('express');
var router = express.Router();
const shortid = require('shortid')

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync(__dirname + '/../data/db.json')
const db = low(adapter)
 
/* 记账本列表. */
router.get('/account', function(req, res, next) {
  res.render('list')
});
router.get('/account/create', function(req, res, next) {
  res.render('create')
});
// 新增记录
router.post('/account', function(req, res, next) {
  // 获取请求数据
  console.log(req.body)
  // 生成随机id
  let id = shortid.generate()
  // 写入文件，最新的在最前面
  db.get('accounts').unshift({ id: id, ...req.body }).write()
  res.send('添加记录')
})
module.exports = router;
