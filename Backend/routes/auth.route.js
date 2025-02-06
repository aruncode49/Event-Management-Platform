import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";

const router = express.Router();

// register route
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const isAlreadyRegistered = await User.findOne({ username });
    if (isAlreadyRegistered) {
      return res.status(400).send("This username is already exists!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({
      message: "User registered successfully!",
    });
  } catch (error) {
    res.status(500).send("Error registering user");
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
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({
          message: "User logged in successfully!",
          data: {
            id: user._id,
            access_token: token,
            role: "user",
          },
        });
      } else {
        res.status(400).send("Invalid Password!");
      }
    } else {
      res.status(400).send("No user found with that username!");
    }
  } catch (error) {
    res.status(500).send("Error while logging as guest!");
  }
});

// guest login route
router.get("/guest-login", async (_, res) => {
  try {
    const guest = await User.findOne({ username: "guest" });
    const token = jwt.sign(
      { id: guest._id, role: guest.role },
      process.env.JWT_SECRET
    );
    res.status(200).json({
      message: "Successfully logged in as guest!",
      data: {
        id: guest._id,
        access_token: token,
        role: "guest",
      },
    });
  } catch (error) {
    res.status(500).send("Error while logging as guest!");
  }
});

export const authRoutes = router;
