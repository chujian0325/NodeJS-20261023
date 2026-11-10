var express = require('express');
var router = express.Router();
const { formidable } = require('formidable') 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 显示网页（表单）
router.get('/portrait', function(req, res, next) {
  res.render('portrait',);
});
// 处理文件上传
router.post('/portrait', function(req, res, next) {
  // 创建form对象
  const form = formidable({
    uploadDir:  __dirname + '/../public/images', // 上传文件的存储目录
    keepExtensions: true, // 保留文件扩展名
  });
  // 解析请求报文
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    // res.json({ fields, files });
    // console.log(fields);
    console.log(files);
    // 服务器保存该图片的访问url，将来将此数据保存在数据库中
    // http://127.0.0.1:3000/images/f16x7bawge02rfn4eydqyhq3p.png
    let url = '/images/'+files.portrait[0].newFilename
    res.send(url);
  });
})

module.exports = router;
