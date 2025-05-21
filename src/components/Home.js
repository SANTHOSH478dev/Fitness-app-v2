// ./components/Home.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";

function Home() {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/workout-plans")
      .then((response) => {
        setWorkoutPlans(response.data);
      })
      .catch((error) => {
        console.error("Error fetching workout plans:", error);
      });
  }, []);

  const handleStartWorkout = (workoutId) => {
    navigate(`/workout/${workoutId}`);
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1 className="main-title">Your Fitness Journey Starts Here</h1>
        <p className="sub-title">
          Choose a plan and start transforming your body today
        </p>
        <div className="hero-buttons">
          <button className="cta-button" onClick={() => navigate("/plans")}>
            Explore Plans
          </button>
          <button
            className="cta-button secondary"
            onClick={() => navigate("/progress")}
          >
            Track Progress
          </button>
        </div>
      </div>

      <div className="workout-plans-container">
        {workoutPlans.map((plan) => (
          <div key={plan.id} className="workout-card">
            <img
              src={plan.imageUrl}
              alt={plan.name}
              className="workout-image"
            />
            <div className="card-content">
              <h2>{plan.name}</h2>
              <p>{plan.description}</p>
              <button
                className="start-button"
                onClick={() => handleStartWorkout(plan.id)}
              >
                Start Workout
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
