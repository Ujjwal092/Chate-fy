// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

//mount
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("hello default");
});
