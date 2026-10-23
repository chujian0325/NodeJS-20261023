var fs = require('fs');
fs.writeFile('test.txt', 'Hello World!', function (err) {
    if (err) throw err;
    console.log('File saved!');
})