const express = require("express");

const homeRouter = require("./routes/homeRouter");
const adminRouter = require("./routes/adminRouter");

const app = express();

app.use(homeRouter);
app.use(adminRouter);

app.all("{*splat}", (req, res) => {
  res.send("404 Not Found");
});

app.listen(9000, () => {
  console.log("http://127.0.0.1");
});
