//* Express / Node.js
const path = require("path");
const express = require("express");
const app = express();
const http = require("http").createServer(app);

//* Socket.io
const io = require("socket.io")(http);

//* Chess.js
//! This might need to change
const { Chess } = require("chess.js");

app.use(express.static(__dirname + "/dist"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});

io.on("connection", socket => {
  socket.on("set game", () => {
    socket.game = new Chess();
    console.log(socket.game.ascii());
  });
});

io.on("connection", socket => {
  socket.on("get fen", () => {
    io.emit("fen update", socket.game.fen());
  });
});

io.on("connection", socket => {
  socket.on("set fen", () => {
    socket.game.load("2k5/2P1P3/1n4b1/p7/1b1pP3/2B2pR1/K5p1/1r4n1 w - - 0 1");
    console.log(socket.game.ascii());
  });
});

http.listen(8000, () => {
  console.log("Listening on Port:8000");
});
