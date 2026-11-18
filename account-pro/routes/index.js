var express = require('express');
var router = express.Router();
const shortid = require('shortid')
const AccountModel = require('../models/AccountModel')
const moment = require('moment')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync(__dirname + '/../data/db.json')
const db = low(adapter)
 
/* 记账本列表. */
router.get('/account', async function(req, res, next) {
  // let result = db.get('accounts').value()

  let result = await AccountModel.find().sort({ time: -1 })
  console.log(result)
  res.render('list',{ result, moment})
});
router.get('/account/create', function(req, res, next) {
  res.render('create')
});
// 新增记录
router.post('/account', function(req, res, next) {
  // 获取请求数据， 2026-11-12 需要转为日期对象 new Date()，借助moment
  console.log('请求体', req.body)
  // 生成随机id
  // let id = shortid.generate()
  // // 写入文件，最新的在最前面
  // db.get('accounts').unshift({ id: id, ...req.body }).write()
  // res.render('success', { msg: '添加成功', url: '/account' })

  // 插入数据库
  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate()
  }).then(() => {
    res.render('success', { msg: '添加成功', url: '/account' })
  })
})

// 删除
router.get('/account/:id', function(req, res, next) {
  let id = req.params.id
  db.get('accounts').remove({ id }).write()
  res.render('success', { msg: '删除成功', url: '/account' })
})
module.exports = router;
