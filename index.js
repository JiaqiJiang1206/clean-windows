const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send(`Hello World!`);
});

// const port = 80;
// app.listen(port, () => {
//   console.log(`helloworld: listening on port ${port}`);
// });
var PORT = process.env.PORT || 3000;
// app.listen(process.env.PORT || 3000);
const server = app.listen(PORT, () => {
  console.log('my socket server is running');
})