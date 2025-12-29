import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

//  __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

//APIroutes mounting
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

//frontend path
const frontendPath = path.join(__dirname, "../../frontend/dist");
console.log("Serving frontend from:", frontendPath);

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
