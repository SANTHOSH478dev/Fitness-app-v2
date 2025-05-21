// server.js

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
    process.env.MONGODB_URI || "mongodb+srv://SAN:FITNESS@cluster0.2e51bck.mongodb.net/",
    { useNewUrlParser: true, useUnifiedTopology: true }
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

// Fallback mock data (your detailed plans)
const workoutPlans = [
  {
    name: 'Cardio Workout',
    description: 'A high-intensity cardio workout',
    imageUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20240306123410/6.jpg',
    workouts: [
      { name: 'Jumping Jacks', description: '3 sets of 20 reps', duration: 5 },
      { name: 'Running', description: '30 mins at moderate pace', duration: 30 },
      { name: 'Cycling', description: '45 mins steady pace', duration: 45 },
      { name: 'Jump Rope', description: '15 mins with intervals', duration: 15 },
      { name: 'Swimming', description: '1 hour with strokes', duration: 60 },
      { name: 'HIIT', description: '20 minutes High Intensity', duration: 20 },
    ]
  },
  {
    name: 'Strength Training',
    description: 'Build muscle and strength',
    imageUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20240306123403/5.jpg',
    workouts: [
      { name: 'Squats', description: '3 sets of 10 reps', duration: 15 },
      { name: 'Push-ups', description: '3 sets of 15 reps', duration: 10 },
      { name: 'Pull-ups', description: '3 sets of 8 reps', duration: 20 },
      { name: 'Deadlifts', description: '3 sets of 5 reps', duration: 25 },
      { name: 'Bench Press', description: '3 sets of 12 reps', duration: 20 },
      { name: 'Dumbbell Rows', description: '10 reps each arm', duration: 15 },
    ]
  },
  {
    name: 'Yoga Routine',
    description: 'Yoga poses for flexibility',
    imageUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20240306123356/4.jpg',
    workouts: [
      { name: 'Sun Salutation', description: '5 rounds', duration: 15 },
      { name: 'Warrior Pose', description: '1 min each side', duration: 10 },
      { name: 'Downward-Facing Dog', description: 'Hold for 1 min', duration: 5 },
      { name: 'Tree Pose', description: '30 sec each side', duration: 10 },
      { name: 'Child\'s Pose', description: 'Relax for 3 min', duration: 20 },
    ]
  },
  {
    name: 'Core Strengthening',
    description: 'Strengthen core muscles',
    imageUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20240306122911/3.jpg',
    workouts: [
      { name: 'Plank', description: 'Hold for 1 min', duration: 10 },
      { name: 'Russian Twists', description: '3 sets of 20', duration: 10 },
      { name: 'Leg Raises', description: '3 sets of 15', duration: 15 },
      { name: 'Crunches', description: '3 sets of 20', duration: 10 },
      { name: 'Bicycle Crunches', description: '3 sets of 20', duration: 15 },
    ]
  },
  {
    name: 'Pilates Routine',
    description: 'Pilates for strength and flexibility',
    imageUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20240306122854/1.jpg',
    workouts: [
      { name: 'Hundred', description: '100 arm pumps in V-sit', duration: 10 },
      { name: 'Roll-Up', description: '3 sets of 10', duration: 15 },
      { name: 'Single Leg Stretch', description: '10 reps each leg', duration: 15 },
      { name: 'Swimming', description: '3 sets of 20 reps', duration: 15 },
      { name: 'Leg Pull Front', description: '3 sets of 10', duration: 15 },
    ]
  },
  {
    name: 'Full Body Circuit',
    description: 'All muscle groups workout',
    imageUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20240306123640/2.jpg',
    workouts: [
      { name: 'Burpees', description: '3 sets of 10', duration: 15 },
      { name: 'Mountain Climbers', description: '3 sets of 20', duration: 10 },
      { name: 'Dumbbell Lunges', description: '10 reps each leg', duration: 15 },
      { name: 'Push Press', description: '3 sets of 10', duration: 15 },
      { name: 'Plank with Shoulder Taps', description: 'Tap shoulders for 1 min', duration: 20 },
    ]
  },
];

// API Route - returns MongoDB data if available, else fallback
app.get("/api/workout-plans", async (req, res) => {
  try {
    const plans = await WorkoutPlan.find();
    if (plans.length === 0) {
      console.log("📦 Returning fallback mock data");
      return res.json(workoutPlans);
    }
    res.json(plans);
  } catch (err) {
    console.error("❌ API error:", err);
    res.status(500).json({ error: "Failed to fetch workout plans" });
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("💪 Welcome to the  Fitness App API!");
});

// Serve React frontend
const __dirnameClean = path.resolve();
app.use(express.static(path.join(__dirnameClean, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirnameClean, "client/build", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
