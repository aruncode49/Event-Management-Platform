import { Router } from "express";
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
      message: "Event created successfully!",
    });
  } catch (error) {
    res.status(400).send("Error while creating event!");
  }
});

export const eventRoutes = router;
