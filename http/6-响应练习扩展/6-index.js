// 获取所有的td
let tds = document.querySelectorAll("td");
// 遍历所有的td
tds.forEach((td) => {
  // 给每一个td绑定点击事件
  td.onclick = function () {
    this.style.background = "orange";
  };
});
