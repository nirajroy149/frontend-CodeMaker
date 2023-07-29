const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.send("hello wld!");
});

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);
});
const PORT = process.env.PORT || 6000;
server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
