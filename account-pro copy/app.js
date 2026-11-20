var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/web/index');
// var usersRouter = require('./routes/users');

// 导入account 接口路由文件
const accountRouter = require('./routes/api/account')
const authApiRouter = require('./routes/api/auth')
const authRouter = require('./routes/web/auth')
const { dbHost, dbName, dbPort } = require("./config/config");

const session = require("express-session");
const { MongoStore } = require("connect-mongo");

var app = express();

// 设置session中间件,
// 会自动在数据库中创建sessions集合，用于存储session数据
app.use(
  session({
    name: "sid", // 设置cookie的name，默认值是connect.sid
    secret: "atguigu", // 参与加密的字符串，又称签名、加盐
    saveUninitialized: false, // 是否为每次请求都设置一个cookie用来存储session的id
    resave: true, // 是否每次请求都重新保存session，默认是false
    // 设置session的存储位置
    store: MongoStore.create({
      mongoUrl: `mongodb://${dbHost}:${dbPort}/${dbName}`,
    }),
    cookie: {
      httpOnly: true, // 开启后，前端无法通过js操作
      maxAge: 7 * 24 * 60 * 60 * 1000, // 设置sessionID的过期时间，7天
    },
  }),
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', accountRouter);
app.use('/api', authApiRouter);
app.use('/', authRouter);

// 配置404页面
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
  res.render("404");
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
