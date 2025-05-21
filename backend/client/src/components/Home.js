// ./components/Home.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import workoutPlans from '../workoutPlans'; // Import local data
import '../index.css';

function Home() {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Directly load workoutPlans from local file
    setPlans(workoutPlans);
  }, []);

  const handleStartWorkout = (workoutId) => {
    navigate(`/workout/${workoutId}`);
  };

  return (
    <div className="home">
      <Navbar />
      <h1>Workout Plans</h1>
      <div className="workout-plans-container">
        {plans.length === 0 ? (
          <p>Loading workout plans...</p>
        ) : (
          plans.map(plan => (
            <div key={plan.id} className="workout-plan-card">
              <h2>{plan.name}</h2>
              <p>{plan.description}</p>
              {plan.imageUrl && (
                <img
                  src={plan.imageUrl}
                  alt={plan.name}
                  className="workout-image"
                  loading="lazy"
                />
              )}
              <br />
              <button
                className="start-button"
                onClick={() => handleStartWorkout(plan.id)}
              >
                Start Workout
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
