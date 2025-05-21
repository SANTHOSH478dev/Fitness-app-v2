const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb+srv://<username>:<password>@cluster.mongodb.net/myDB?retryWrites=true&w=majority"
  )
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Mongoose Schemas
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

const WorkoutPlan = mongoose.model("WorkoutPlan", workoutPlanSchema);

// Dummy fallback data
const workoutPlans = [
  {
    name: "Beginner Full Body",
    description: "A great place to start your fitness journey.",
    imageUrl: "/images/beginner.jpg",
    workouts: [
      { name: "Jumping Jacks", description: "Warm up", duration: 30 },
      { name: "Push Ups", description: "Upper body strength", duration: 20 },
    ],
  },
  {
    name: "Advanced Shred",
    description: "Burn fat and get ripped!",
    imageUrl: "/images/advanced.jpg",
    workouts: [
      { name: "Burpees", description: "Cardio & strength", duration: 40 },
      { name: "Pull Ups", description: "Back and arms", duration: 30 },
    ],
  },
];

// API route
app.get("/api/workout-plans", async (req, res) => {
  try {
    const plans = await WorkoutPlan.find();
    if (plans.length === 0) return res.json(workoutPlans); // fallback
    res.json(plans);
  } catch (err) {
    console.error("❌ API error:", err);
    res.status(500).json({ error: "Failed to fetch workout plans" });
  }
});

// Serve React frontend
const __dirnameClean = path.resolve();
app.use(express.static(path.join(__dirnameClean, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirnameClean, "client/build", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
