import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { authRoutes } from "./routes/auth.route.js";
import { eventRoutes } from "./routes/event.route.js";
import { isAuthenticated } from "./middlewares/auth.middleware.js";

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.log(err));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/event", isAuthenticated, eventRoutes);

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
