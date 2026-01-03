import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const { MONGO_URL } = process.env;
    if (!MONGO_URL) throw new Error("MONGO_URL is not found");
    await mongoose.connect(process.env.MONGO_URL); //connecting to mongoDB and till it is not connected rest of the code will not execute
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); //1 means fail
  }
};
