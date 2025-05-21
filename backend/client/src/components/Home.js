// ./components/Home.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";

// Reusable Workout Card Component
function WorkoutCard({ plan, onStart }) {
  return (
    <div className="workout-card" tabIndex={0} role="button" onClick={() => onStart(plan.id)} onKeyDown={e => { if (e.key === 'Enter') onStart(plan.id) }}>
      <img
        src={plan.imageUrl}
        alt={plan.name}
        className="workout-image"
        loading="lazy"
      />
      <div className="card-content">
        <h3 className="plan-name">{plan.name}</h3>
        <p className="plan-description">{plan.description}</p>
        <button
          className="start-button"
          onClick={e => { e.stopPropagation(); onStart(plan.id); }}
        >
          Start Workout
        </button>
      </div>
    </div>
  );
}

function Home() {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/workout-plans")
      .then((response) => setWorkoutPlans(response.data))
      .catch((error) => console.error("Error fetching workout plans:", error));
  }, []);

  const handleStartWorkout = (workoutId) => {
    navigate(`/workout/${workoutId}`);
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="main-title">
            Your Fitness Journey <br /> Starts Here
          </h1>
          <p className="sub-title">
            Choose a plan and start transforming your body today.
          </p>
          <div className="hero-buttons">
            <button
              className="cta-button"
              onClick={() => navigate("/plans")}
            >
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
      </section>

      <section className="workout-plans-section">
        <h2 className="section-title">Featured Workout Plans</h2>
        <div className="workout-plans-container">
          {workoutPlans.length === 0 ? (
            <p className="loading-text">Loading plans...</p>
          ) : (
            workoutPlans.map((plan) => (
              <WorkoutCard key={plan.id} plan={plan} onStart={handleStartWorkout} />
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
