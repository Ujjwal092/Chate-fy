import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { signup, login, logout } from "../controllers/auth.controller.js";
import { updateProfile } from "../controllers/auth.controller.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

//importing express to create router
const router = express.Router();
// router.use(arcjetProtection); //apply arcjet protection middleware to all auth routes

//if req passes arcjet protection, proceed to auth routes

router.post("/signup", arcjetProtection, signup);
router.post("/login", arcjetProtection, login);
router.post("/logout", arcjetProtection, logout);

router.put("/update-profile", protectRoute, updateProfile);
router.get("/check", protectRoute, (req, res) => {
  res.status(200).json(req.user);
});

export default router;

//middleware to protect routes
