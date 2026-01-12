import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getAllContacts,
  getChatPartners,
  getMessagesByUserId,
  sendMessage,
} from "../controllers/message.controller.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();

/* =========================
   READ ROUTES (NO ARCJET)
   ========================= */
router.get("/contacts", protectRoute, getAllContacts);
router.get("/chats", protectRoute, getChatPartners);
router.get("/:id", protectRoute, getMessagesByUserId);

/* =========================
   WRITE ROUTES (ARCJET OK)
   ========================= */
router.post("/send/:id", arcjetProtection, protectRoute, sendMessage);

export default router;
