import express from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";
//importing express to create router
const router = express.Router();
router.post("/signup", signup); //signup controller to be implemented
router.post("/login", login); //login controller to be implemented
router.post("/logout", logout); //logout controller to be implemented
export default router;
