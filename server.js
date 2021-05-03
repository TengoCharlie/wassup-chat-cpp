const express = require("express");
const app = express();
const http = require("http").createServer(app);
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));   //express middle ware for all static files

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

http.listen(PORT, () => {
  console.log(`Listenning on port ${PORT}`);
});


// Socket 

const io = require("socket.io")(http);

io.on('connection', (socket) => {
  console.log('Connected');

  socket.on('message', (msg) => {
    socket.broadcast.emit('message', msg);
  })
})