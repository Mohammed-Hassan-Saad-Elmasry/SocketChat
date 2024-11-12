import { Server } from "socket.io";
import { auth, roles } from "../middleware/auth.js";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.use(auth(Object.values(roles)));

  let users = {};
  io.on("connection", (socket) => {
    let userId = socket.user.id
    // console.log("New client connected:", socket.id);
    users[userId] = { socketId: socket.id };
    console.log(users);
    socket.emit("hellouser", "Welcome to the server!");

    // socket.on("sendmessage", (data) => {
    //   socket.broadcast.emit("hello", data.message);
    //   console.log(data.message);
    // });

    socket.on("sendmessage", (data) => {
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
