import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TrackProgress from "./TrackProgress"; // import TrackProgress component
import "../index.css";

function WorkoutPage() {
  const { id } = useParams();
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [selectedWorkouts, setSelectedWorkouts] = useState({});
  const [counts, setCounts] = useState({}); // New state for reps count
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds

  // Timer ref to clear interval on unmount
  const timerRef = useRef(null);

  useEffect(() => {
    if (!id) {
      console.error("Invalid workout plan ID:", id);
      return;
    }

    axios
      .get(`http://localhost:5001/api/workout-plans`)
      .then((response) => {
        const plan = response.data.find((plan) => plan.id === parseInt(id));
        if (plan) {
          setWorkoutPlan(plan);

          const initialSelectedWorkouts = {};
          const initialCounts = {};
          plan.workouts.forEach((workout) => {
            initialSelectedWorkouts[workout.name] = false;
            initialCounts[workout.name] = 10; // default 10 reps each
          });
          setSelectedWorkouts(initialSelectedWorkouts);
          setCounts(initialCounts);
        } else {
          console.error("Workout plan not found:", id);
        }
      })
      .catch((error) => {
        console.error("Error fetching workout plans:", error);
      });
  }, [id]);

  // Timer countdown effect
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  const handleCheckboxChange = (workoutName) => {
    setSelectedWorkouts({
      ...selectedWorkouts,
      [workoutName]: !selectedWorkouts[workoutName],
    });
  };

  const incrementCount = (workoutName) => {
    setCounts((prev) => ({
      ...prev,
      [workoutName]: prev[workoutName] + 1,
    }));
  };

  const decrementCount = (workoutName) => {
    setCounts((prev) => ({
      ...prev,
      [workoutName]: prev[workoutName] > 1 ? prev[workoutName] - 1 : 1,
    }));
  };

  // Format time mm:ss
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (workoutPlan === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="workout-plan">
      {/* Timer at top-right */}
      <div className="timer-container">Timer: {formatTime(timeLeft)}</div>

      <h1 className="workout-plan-title">{workoutPlan.name}</h1>
      <img
        src={workoutPlan.imageUrl}
        alt={workoutPlan.name}
        className="workout-image"
      />
      <p>{workoutPlan.description}</p>

      <div className="workout-list">
        {workoutPlan.workouts &&
          workoutPlan.workouts.map((workout) => (
            <div
              key={workout.name}
              className={`workout-item ${
                selectedWorkouts[workout.name] ? "selected" : ""
              }`}
            >
              <input
                type="checkbox"
                checked={selectedWorkouts[workout.name]}
                onChange={() => handleCheckboxChange(workout.name)}
              />
              <label>{workout.name}</label>

              {/* Count increment/decrement controls */}
              <div className="counter-controls">
                <button onClick={() => decrementCount(workout.name)}>-</button>
                <span>{counts[workout.name]}</span>
                <button onClick={() => incrementCount(workout.name)}>+</button>
              </div>
            </div>
          ))}
      </div>

      {/* Pass workouts and selectedWorkouts as props */}
      <TrackProgress
        workouts={workoutPlan.workouts}
        selectedWorkouts={selectedWorkouts}
      />
    </div>
  );
}

export default WorkoutPage;
