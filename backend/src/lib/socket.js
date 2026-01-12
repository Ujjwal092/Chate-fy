import { Server } from "socket.io";
import http from "http";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

let io;
let server;

// 🔥 SINGLE SOURCE OF TRUTH
const userSocketMap = {}; // { userId: socketId }

// helper for message controller
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

export const initSocket = (app) => {
  server = http.createServer(app);

  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  // 🔐 socket auth
  io.use(socketAuthMiddleware);

  io.on("connection", (socket) => {
    const userId = socket.user?._id?.toString();

    if (!userId) {
      console.log("❌ Socket connected without userId");
      socket.disconnect();
      return;
    }

    console.log("✅ User connected:", socket.user.fullName);

    // mark user online
    userSocketMap[userId] = socket.id;

    // broadcast online users
    io.emit("onlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.user.fullName);

      delete userSocketMap[userId];
      io.emit("onlineUsers", Object.keys(userSocketMap));
    });
  });

  return server;
};

export { io };
