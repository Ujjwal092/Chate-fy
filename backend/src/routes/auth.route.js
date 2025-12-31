import express from "express";
import { signup } from "../controllers/auth.controller.js";
//importing express to create router
const router = express.Router();

// router.get("/login", (req, res) => {
//   res.send("Login endpoint");
// });

// router.post("/logout", (req, res) => {
//   res.send("Logout endpoint");
// });

router.post("/signup", signup); //signup controller to be implemented
export default router;
