/**
 * 通过isLogin决定要输出的内筒
 * true 输出<span>欢迎回来</span>
 * false 输出<button>登录</button> <button>注册</button>
 */

const ejs = require("ejs");
let isLogin = false;

// 原生JS实现：
// if (isLogin) {
//   console.log("<span>欢迎回来</span>");
// } else {
//   console.log("<button>登录</button> <button>注册</button>");
// }

// EJS 实现：

let result = ejs.render(
  `
    <% if(isLogin){%>
    <span>欢迎回来</span>
    <% }else{%>
    <button>登录</button> <button>注册</button>
    <% }%>
    `,
  { isLogin: isLogin },
);
console.log(result);
