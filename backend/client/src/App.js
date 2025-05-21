// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Plans from "./components/Plans";
import TrackProgress from "./components/TrackProgress";
import Contact from "./components/contact";
import Profile from "./components/Profile";
import WorkoutPage from "./components/WorkoutPage";
import CreateAccount from "./components/CreateAccount";
import Login from "./components/Login";
import WorkoutList from "./components/WorkoutList";
import workoutPlans from "./components/workoutPlans";


const App = () => {
  return (
    <Router>
      {/* Navbar shown on all pages */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/progress" element={<TrackProgress />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/workout/:id" element={<WorkoutPage />} />
        <Route path="/workout-list" element={<WorkoutList />} />
        <Route path="/workoutPlans" element={<workoutPlans />} />
      </Routes>
    </Router>
  );
};

export default App;
