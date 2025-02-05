import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { Event } from "../models/event.model.js";

const router = Router();

router.post("/create", async (req, res) => {
  try {
    const { name, description, imageUrl, date } = req.body;
    const createdBy = req.user.id; // Get the user ID from the authenticated user
    const event = new Event({
      name,
      description,
      date,
      imageUrl,
      createdBy,
    });
    await event.save();
    res.status(201).json({
      success: true,
      message: "Event created successfully!",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error while creating event!",
    });
  }
});

export const eventRoutes = router;
