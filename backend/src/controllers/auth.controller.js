import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import dotenv from "dotenv";
dotenv.config();
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    //check if email is valid : regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    //check if user already exists user is used to store the result
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    //hash the password before saving to database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);

      res.status(201).json({
        _id: savedUser._id,
        fullName: savedUser.fullName,
        email: savedUser.email,
        profilePic: savedUser.profilePic,
      });
      try {
        await sendWelcomeEmail(
          savedUser.email,
          savedUser.fullName, //??
          process.env.CLIENT_URL
        );
      } catch (err) {
        console.log("Error sending email verification", err);
      }

      //send email verification link
    } else {
      return res.status(400).json({ message: "Error creating user" });
    }
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

//login controller
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //check if all fields are provided
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //compare password here password is plain text password from req and user.password is hashed password from db previously stored
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    //generate token
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

//logout controller
export const logout = async (req, res) => {
  try {
    //clearing cookie by setting maxAge to 0
    res.clearCookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

//update profile controller
export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }
    //in protectedRoute middleware we call the next() function after verifying the token and req.user is set to the authenticated user
    const userId = req.user._id; //authenticated user's id
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );
    res.status(200).json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      profilePic: updatedUser.profilePic,
    });
  } catch (error) {
    console.log("Error updating profile picture", error);
    res.status(500).json({ message: "server error" });
  }
};
