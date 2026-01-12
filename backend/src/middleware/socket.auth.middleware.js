import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

export const socketAuthMiddleware = async (socket, next) => {
  try {
    // EXTRACT JWT FROM COOKIE
    const cookieHeader = socket.handshake.headers.cookie;

    if (!cookieHeader) {
      console.log("❌ Socket rejected: No cookies found");
      return next(new Error("Unauthorized - No Cookies"));
    }

    // Find jwt token from cookies
    const token = cookieHeader
      .split("; ")
      .find((cookie) => cookie.startsWith("jwt="))
      ?.split("=")[1];

    if (!token) {
      console.log("❌ Socket rejected: JWT token missing");
      return next(new Error("Unauthorized - No Token"));
    }

    // VERIFY JWT

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 SUPPORT BOTH PAYLOAD STYLES
    // signup/login may use { id } or { userId }
    const userId = decoded.userId || decoded.id;

    if (!userId) {
      console.log("❌ Socket rejected: Invalid JWT payload", decoded);
      return next(new Error("Unauthorized - Invalid Token"));
    }

    //FETCH USER FROM DATABASE

    const user = await User.findById(userId).select("-password");

    if (!user) {
      console.log("❌ Socket rejected: User not found in DB");
      return next(new Error("Unauthorized - User Not Found"));
    }

    // ATTACH USER TO SOCKET OBJECT

    socket.user = user; // full user object
    socket.userId = user._id.toString(); // normalized userId

    console.log(`✅ Socket authenticated: ${user.fullName} (${socket.userId})`);

    next(); // allow socket connection
  } catch (error) {
    console.log("❌ Socket auth error:", error.message);
    next(new Error("Unauthorized - Socket Authentication Failed"));
  }
};
