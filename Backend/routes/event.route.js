import { Router } from "express";
import { Event } from "../models/event.model.js";
import mongoose from "mongoose";

const router = Router();

// create event
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

// get all events
router.get("/all-events", async (_, res) => {
  try {
    const allEvents = await Event.find({});
    res.status(200).json({
      allEvents,
    });
  } catch (error) {
    res.status(500).send("Error while fetching event!");
  }
});

// delete an event
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    res.status(200).json({
      message: "Event deleted successfully!",
    });
  } catch (error) {
    res.status(500).send("Error while deleting an event!");
  }
});

// get event by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Validate the ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid event ID");
    }
    const event = await Event.findById(id);
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(400).send("Invalid event ID");
    }
  } catch (error) {
    res.status(500).send("Error while fetching an event!");
  }
});

// update event by id
router.post("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, imageUrl, date } = req.body;
    const event = await Event.findByIdAndUpdate(id, {
      name,
      description,
      date,
      imageUrl,
    });
    if (event) {
      res.status(200).json({
        message: "Event updated successfully!",
      });
    }
  } catch (error) {
    res.status(500).send("Error while updating an event!");
  }
});

// Join Event
router.post("/join-event/:id", async (req, res) => {
  const eventId = req.params.id;
  const userId = req.user.id;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).send("Event not found");
    }

    // Check if the user is already an attendee
    if (event.attendees.includes(userId)) {
      return res.status(400).send("You have already joined this event");
    }

    // Add the user to the attendees list
    event.attendees.push(userId);
    await event.save();

    // Emit a real-time update to all clients in the event room
    req.app.get("io").to(eventId).emit("attendeesUpdated", {
      eventId,
      attendees: event.attendees,
    });

    res.status(200).send("You have successfully joined this event!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error while joining an event!");
  }
});

export const eventRoutes = router;
