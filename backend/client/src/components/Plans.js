// ./components/Plans.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import workoutPlans from "../workoutPlans"; // Import local data file
import "./Plans.css";

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Directly set plans from the imported local data
    setPlans(workoutPlans);
  }, []);

  const handleSelectPlan = (id) => {
    navigate(`/workout/${id}`);
  };

  return (
    <div className="plans-page">
      <h1>Choose Your Workout Plan</h1>
      <div className="plans-list">
        {plans.length === 0 ? (
          <p>Loading plans...</p>
        ) : (
          plans.map((plan) => (
            <div key={plan.id} className="plan-card">
              {plan.imageUrl && (
                <img
                  src={plan.imageUrl}
                  alt={plan.name}
                  className="plan-image"
                  loading="lazy"
                />
              )}
              <h2>{plan.name}</h2>
              <p>{plan.description}</p>
              <button onClick={() => handleSelectPlan(plan.id)}>
                Start Plan
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Plans;
