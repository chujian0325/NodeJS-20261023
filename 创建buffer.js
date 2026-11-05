// 创建buffer有三种方式
// 1. Buffer.alloc(size[, fill[, encoding]])
let buf = Buffer.alloc(10)
// console.log(buf)
// 2. Buffer.allocUnsafe(size) // 不安全，创建的buffer可能包含敏感数据，或过去遗留的内存
let buf2 = Buffer.allocUnsafe(10)
// console.log(buf2)
// 3. Buffer.from(array)
let buf3 = Buffer.from('hello')
console.log(buf3)
let buf4 = Buffer.from([1, 2, 3])
// console.log(buf4)

// 读写，采用[下标]的方式读写，从0开始
console.log(buf3[0])
buf3[0] = 65
console.log(buf3[0])