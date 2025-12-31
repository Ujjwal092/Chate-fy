import express from "express";
import { signup } from "../controllers/auth.controller.js";
//importing express to create router
const router = express.Router();
router.post("/signup", signup); //signup controller to be implemented
export default router;
