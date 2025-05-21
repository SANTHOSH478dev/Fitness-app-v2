const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection (optional if you're not using real DB)
mongoose
  .connect(process.env.MONGODB_URI || "your-fallback-uri", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Define schema (if needed later)
const workoutSchema = new mongoose.Schema({
  name: String,
  description: String,
  duration: Number,
});
const workoutPlanSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageUrl: String,
  workouts: [workoutSchema],
});

// Mock data
const workoutPlans = [/* Your existing plans data (same as you provided) */];

// API routes
app.get("/api/workout-plans", (req, res) => {
  res.json(workoutPlans);
});

// Serve static files from React frontend
app.use(express.static(path.join(__dirname, "../client/build")));

// Serve React app for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
