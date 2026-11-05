const fs = require("fs");
/**
 * fs.readFile(path[, options], callback)
 */
fs.readFile("./output.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});
