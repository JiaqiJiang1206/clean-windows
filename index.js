const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send(`Hello World!`);
});


var PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log("My socket server is running");
})

const io = require('socket.io')(server);

app.use(express.static('public'));

