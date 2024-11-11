import { Server } from "socket.io";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  let userId;
  io.use((socket, next) => {
    if (!socket.handshake.auth.token) {
      return next(new Error("Token is required"));
    }
    userId = socket.handshake.auth.token;
    next();
  });

  let users = {};
  io.on("connection", (socket) => {
    // console.log("New client connected:", socket.id);
    users[userId] = { socketId: socket.id };
    console.log(users);
    socket.emit("hellouser", "Welcome to the server!");

    socket.on("sendmessage", (data) => {
      socket.broadcast.emit("hello", data.message);
      console.log(data.message);
    });

    socket.on("sendmessage", (data) => {
      console.log(data);
      io.to(users[data.userId].socketId).emit("messageTouser", {
        message: data.message,
      });
    });

    //  Optional: Set up a disconnect handler
    socket.on("disconnect", () => {
      delete users[socket.userId];
      console.log("Client disconnected:", socket.id);
    });
  });
};
