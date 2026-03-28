import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { initSocket } from "./lib/socket.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

/* ================= CORS ================= */
app.use(
  cors({
    origin: process.env.CLIENT_URL, // frontend URL
    credentials: true,
  }),
);

/* ================= MIDDLEWARE ================= */
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

/* ================= ROUTES ================= */
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

/* ================= SOCKET ================= */
const server = initSocket(app);

/* ================= START SERVER ================= */
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
  });
