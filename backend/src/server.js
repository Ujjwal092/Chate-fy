import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { initSocket } from "./lib/socket.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// cors
app.use(
  cors({
    origin: process.env.CLIENT_URL || true,
    credentials: true,
  })
);

app.options("*", cors());

// body + cookies
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

// DB
connectDB();

// routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// frontend (optional)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, "../../frontend/dist");

app.use(express.static(frontendPath));
app.get("*", (req, res) => res.sendFile(path.join(frontendPath, "index.html")));

// SOCKET + SERVER START (SINGLE SOURCE)
const server = initSocket(app);

server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
