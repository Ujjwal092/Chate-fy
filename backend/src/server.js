import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config({ path: "./src/.env" });

const app = express();
const PORT = process.env.PORT || 4000;

//  __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//connect to database
connectDB();
app.use(express.json()); //middleware to parse JSON bodies means after using this, req.body will have the parsed JSON or data sent by client

//APIroutes mounting
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

//frontend path
const frontendPath = path.join(__dirname, "../../frontend/dist");

//Always serve frontend
app.use(express.static(frontendPath));

//fallback if no API routes are hit
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
