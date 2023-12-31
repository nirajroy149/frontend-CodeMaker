const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const ACTIONS = require("./src/Actions");
const path = require("path");

//creating server
const server = http.createServer(app);
const io = new Server(server);

// including .env
dotenv.config();

const __dirname1 = path.resolve();

app.use(express.static(path.join(__dirname1, "/build")));
// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

// Allow requests from a specific origin
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'https://example.com'); // Replace with your allowed origin
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   next();
// });

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname1, "build", "index.html"));
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
  // console.log("socket connected", socket.id);

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

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is listening at PORT ${PORT}`);
});
