import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { authRoutes } from "./routes/auth.route.js";
import { eventRoutes } from "./routes/event.route.js";
import { isAuthenticated } from "./middlewares/auth.middleware.js";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT;

// Initialize socket io
const io = new Server(server, {
  cors: {
    origin: "https://event-management-platform-sigma.vercel.app",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.log(err));

// Attach socket io to the app
app.set("io", io);

// routes
app.use("/api/auth", authRoutes);
app.use("/api/event", isAuthenticated, eventRoutes);

// socket io connection handling
io.on("connection", (socket) => {
  console.log("New client connected");

  // join a room for a specific event
  socket.on("joinEventRoom", (eventId) => {
    socket.join(eventId);
    console.log(`User joined event room ${eventId}`);
  });

  // handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
