import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import TrackProgress from "./TrackProgress";
import "../index.css";

function WorkoutPage() {
  const [exercises, setExercises] = useState([]);
  const [selectedWorkouts, setSelectedWorkouts] = useState({});
  const [counts, setCounts] = useState({});
  const [timeLeft, setTimeLeft] = useState(25 * 60);

  const timerRef = useRef(null);

  useEffect(() => {
    axios
      .get("https://gym-fit.p.rapidapi.com/v1/exercises", {
        headers: {
          "x-rapidapi-host": "gym-fit.p.rapidapi.com",
          "x-rapidapi-key": "92e2e9d5b8msh3f48e98d42649d3p18bc93jsnf8c45f20029e",
        },
      })
      .then((response) => {
        const fetchedExercises = response.data;

        setExercises(fetchedExercises);

        // Initialize selectedWorkouts and counts for all exercises
        const initialSelected = {};
        const initialCounts = {};
        fetchedExercises.forEach((ex) => {
          initialSelected[ex.name] = false;
          initialCounts[ex.name] = 10; // default reps
        });
        setSelectedWorkouts(initialSelected);
        setCounts(initialCounts);
      })
      .catch((error) => {
        console.error("Error fetching exercises:", error);
      });
  }, []);

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

  const handleCheckboxChange = (name) => {
    setSelectedWorkouts((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const incrementCount = (name) => {
    setCounts((prev) => ({
      ...prev,
      [name]: prev[name] + 1,
    }));
  };

  const decrementCount = (name) => {
    setCounts((prev) => ({
      ...prev,
      [name]: prev[name] > 1 ? prev[name] - 1 : 1,
    }));
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (exercises.length === 0) return <div>Loading...</div>;

  return (
    <div className="workout-plan">
      <div className="timer-container">Timer: {formatTime(timeLeft)}</div>

      <h1 className="workout-plan-title">Workout Plan</h1>

      <div className="workout-list">
        {exercises.map((ex) => (
          <div
            key={ex.id}
            className={`workout-item ${
              selectedWorkouts[ex.name] ? "selected" : ""
            }`}
          >
            <input
              type="checkbox"
              checked={selectedWorkouts[ex.name] || false}
              onChange={() => handleCheckboxChange(ex.name)}
            />
            <label>{ex.name}</label>
            {ex.gifUrl && (
              <img src={ex.gifUrl} alt={ex.name} className="workout-image" />
            )}

            <div className="counter-controls">
              <button onClick={() => decrementCount(ex.name)}>-</button>
              <span>{counts[ex.name]}</span>
              <button onClick={() => incrementCount(ex.name)}>+</button>
            </div>
          </div>
        ))}
      </div>

      <TrackProgress workouts={exercises} selectedWorkouts={selectedWorkouts} />
    </div>
  );
}

export default WorkoutPage;
