var fs = require('fs');
fs.readFile('a.txt', 'utf8', function (err, data) {
    if (err) throw err;
    console.log(err); // null
    console.log(data); // 你好
    var newData = data + 'hello';
    fs.writeFile('a.txt', newData, function (err) {
        if (err) throw err;
        console.log('追加成功');
    })
})