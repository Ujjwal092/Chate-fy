import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; ///req ke andar cookies me se jwt token le rahe hai
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
    //will verify token with secret key and return payload jo token me tha
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded)
      return res.status(401).json({ message: "Not authorized, token invalid" });

    //if token is valid then find the user from the database and attach to req object
    const user = await User.findById(decoded.id).select("-password"); //-password means password ko exclude kar dena rest of the fields ke sath user le aana

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user; //agr user mil jata hai to usko req ke andar attach kar dena taaki aage ke middleware ya route handlers me use kar sake
    next(); //next middleware ya route handler ko call karne ke liye
  } catch (error) {
    console.error("Error in protectRoute middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
