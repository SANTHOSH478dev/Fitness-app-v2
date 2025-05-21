import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../index.css';
import Nav from './Navbar';

// Local workout plan data (instead of API or MongoDB)
import { workoutPlans } from './workoutPlans';

const WorkoutPage = () => {
  const { id } = useParams();
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [selectedWorkouts, setSelectedWorkouts] = useState({});

  useEffect(() => {
    const plan = workoutPlans.find(plan => plan.id === parseInt(id));
    if (plan) {
      setWorkoutPlan(plan);
      const initialSelections = {};
      plan.workouts.forEach(w => {
        initialSelections[w.name] = false;
      });
      setSelectedWorkouts(initialSelections);
    } else {
      console.error("Workout plan not found for ID:", id);
    }
  }, [id]);

  const handleCheckboxChange = (workoutName) => {
    setSelectedWorkouts(prev => ({
      ...prev,
      [workoutName]: !prev[workoutName]
    }));
  };

  const isAllCompleted = Object.values(selectedWorkouts).every(Boolean);

  if (!workoutPlan) return <div>Loading workout plan...</div>;

  return (
    <div className="workout-page-container">
      <Nav />
      <div className="workout-header">
        <h1>{workoutPlan.name}</h1>
        <p>{workoutPlan.description}</p>
      </div>
      <div className="workout-image-container">
        <img src={workoutPlan.imageUrl} alt={workoutPlan.name} className="plan-image-large" />
      </div>

      <div className="workouts-section">
        <h2>Workouts</h2>
        <ul className="workout-list">
          {workoutPlan.workouts.map(workout => (
            <li key={workout.name} className={`workout-card ${selectedWorkouts[workout.name] ? 'completed' : ''}`}>
              <div className="workout-info">
                <h3>{workout.name}</h3>
                <p>{workout.description}</p>
                <span>🕒 {workout.duration} min</span>
              </div>
              <input
                type="checkbox"
                checked={selectedWorkouts[workout.name]}
                onChange={() => handleCheckboxChange(workout.name)}
              />
            </li>
          ))}
        </ul>
        {isAllCompleted && (
          <div className="completion-banner">
            🎉 You’ve completed the full workout plan!
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutPage;
