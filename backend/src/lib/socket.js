import { Server } from "socket.io";
import http from "http";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

let io;
let server;

//  use Map for better handling
const userSocketMap = new Map();

// helper
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap.get(receiverId);
};

export const initSocket = (app) => {
  server = http.createServer(app);

  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL, //  FIXED
      credentials: true,
    },
  });

  //  auth middleware
  io.use(socketAuthMiddleware);

  io.on("connection", (socket) => {
    const userId = socket.user?._id?.toString();

    if (!userId) {
      console.log("❌ Socket connected without userId");
      socket.disconnect();
      return;
    }

    console.log("✅ User connected:", socket.user.fullName);

    // store mapping
    userSocketMap.set(userId, socket.id);

    // broadcast online users
    io.emit("onlineUsers", Array.from(userSocketMap.keys()));

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.user.fullName);

      userSocketMap.delete(userId);

      io.emit("onlineUsers", Array.from(userSocketMap.keys()));
    });
  });

  return server;
};

export { io };
