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

//first arcjetProtection to filter out bad bots and rate limits then protectRoute to ensure only authenticated users can access the routes make more effective
router.use(arcjetProtection, protectRoute);

//we need protectRoute middleware to ensure only authenticated users can access these routes else they can access the routes without authentication
router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getMessagesByUserId);
router.post("/send/:id", sendMessage);

router.get("/send", (req, res) => {
  res.send(" Send message endpoint");
});

export default router;
