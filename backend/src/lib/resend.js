import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

// ✅ FIRST validate env vars
if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not defined in environment variables");
}

if (!process.env.EMAIL_FROM) {
  throw new Error("EMAIL_FROM is not defined in environment variables");
}

// ✅ THEN create client
export const resendClient = new Resend(process.env.RESEND_API_KEY);

export const sender = {
  email: process.env.EMAIL_FROM,
  name: process.env.EMAIL_FROM_NAME || "Chate-fy",
};
