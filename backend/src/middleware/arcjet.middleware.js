import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
  try {
    const ip =
      req.ip ||
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket?.remoteAddress;

    const decision = await aj.protect(req, {
      characteristics: {
        ip,
        userAgent: req.headers["user-agent"],
      },
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).send("Too Many Requests");
      }
      if (decision.reason.isBot()) {
        return res.status(403).send("Bot access denied");
      }
      return res.status(403).send("Access denied");
    }

    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).send("Spoofed bot blocked");
    }

    next();
  } catch (err) {
    console.error("Arcjet error:", err);
    next(); // Fail open on error
  }
};
