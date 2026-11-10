const ejs = require("ejs");
const fs = require("fs");
let china = "中国";

let str = `我爱你${china}`;
let weather = "今天是晴天";
let str2 = fs.readFileSync("./01-EJS.html").toString();
// 使用ejs模板引擎
// let html = ejs.render("我爱你 <%= china %>", { china: china });
let html = ejs.render(str2, { china: china,weather });

console.log(html);
