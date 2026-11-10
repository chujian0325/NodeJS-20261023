var express = require('express');
var router = express.Router();

/* 记账本列表. */
router.get('/account', function(req, res, next) {
  res.send('记账本列表')
});
router.get('/account/create', function(req, res, next) {
  res.send('添加记账本')
});

module.exports = router;
