const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const ACTIONS = require("./src/Actions");

const server = http.createServer(app);
const io = new Server(server);
dotenv.config();

app.get("/", (req, res) => {
  res.send("hello wld!");
});

// stores the mapping of userName and sockeid
// {
//   'dsfsfsf': 'Niraj roy'
// }
const userSocketMap = {};

function getAllConnectedClientes(roomId) {
  //returns all the members of given roomId from sockest.adapter in map format.
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        userName: userSocketMap[socketId],
      };
    }
  );
}

// on any Socket connection
io.on("connection", (socket) => {
  console.log("socket connected", socket.id);

  // when a user joins the socket
  socket.on(ACTIONS.JOIN, ({ roomId, userName }) => {
    userSocketMap[socket.id] = userName;

    // creating a room with given roomID.
    socket.join(roomId);

    // getting all who are connected to current room
    const clients = getAllConnectedClientes(roomId);

    //
    clients.forEach(({ socketId }) => {
      //  ACTIONS.JOINED => notifies someone has joined
      // sending to frontend
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        userName,
        socketId: socket.id,
      });
    });
  });

  // when code change in a particular room
  socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
    // broadcasting
    socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  // syncing code whenever new user joins the room
  socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
    io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  // when a client disconnect a room
  socket.on("disconnecting", () => {
    // getting all the rooms
    const rooms = [...socket.rooms];

    rooms.forEach((roomId) => {
      // disconnecting the user from a room
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        userName: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
    socket.leave();
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening at PORT ${PORT}`);
});
