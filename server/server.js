const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");

const server = http.createServer(app);
const io = new Server(server);

dotenv.config();

app.get("/", (req, res) => {
  res.send("hello wld!");
});

// on any Socket connection
io.on("connection", (socket) => {
  console.log("socket connected", socket.id);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is listening at PORT ${PORT}`);
});
