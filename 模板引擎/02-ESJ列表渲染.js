const ejs = require("ejs");
const fs = require("fs");
let xiyou = ["唐僧", "孙悟空", "猪八戒", "沙僧"];

// let str = "<ul>";

// xiyou.forEach((item) => {
//   str += `<li>${item}</li>`;
// });

// str += "</ul>";
// console.log(str);

// EJS实现
let str2 = fs.readFileSync("./02.西游.html").toString();
let result = ejs.render(str2, { xiyou });
console.log(result);
