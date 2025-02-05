import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";

const router = express.Router();

// register route
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({
      success: true,
      message: "User registered successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error registering user",
    });
  }
});

// login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user) {
      // check correct password
      const isCorrectPassword = await bcrypt.compare(password, user.password);
      if (isCorrectPassword) {
        // generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res.status(200).json({
          success: true,
          message: "User logged in successfully!",
          data: {
            access_token: token,
            role: "user",
          },
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Invalid Password!",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "No user found with that username!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while logging as guest!",
    });
  }
});

// guest login route
router.post("/guest-login", async (_, res) => {
  try {
    const guest = await User.findOne({ username: "guest" });
    if (!guest) {
      return res.status(404).json({
        success: false,
        message: "Guest user not found",
      });
    }

    const token = jwt.sign(
      { id: guest._id, role: guest.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({
      success: true,
      message: "Successfully logged in as guest!",
      data: {
        access_token: token,
        role: "guest",
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while logging as guest!",
    });
  }
});

export const authRoutes = router;
