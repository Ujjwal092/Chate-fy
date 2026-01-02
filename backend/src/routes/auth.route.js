import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { signup, login, logout } from "../controllers/auth.controller.js";
import { updateProfile } from "../controllers/auth.controller.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

//importing express to create router
const router = express.Router();
router.use(arcjetProtection); //apply arcjet protection middleware to all auth routes
router.post("/signup", signup); //signup controller to be implemented
router.post("/login", login); //login controller to be implemented
router.post("/logout", logout); //logout controller to be implemented
router.put("/update-profile", protectRoute, updateProfile); //first authenticate user then update profile

router.get("/check", protectRoute, (req, res) => {
  res.status(200).json({ message: "You are logged in", user: req.user });
});
export default router;

//middleware to protect routes
