import React, { useEffect, useState } from "react";

function WorkoutList() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-host": "gym-fit.p.rapidapi.com",
        "x-rapidapi-key": "92e2e9d5b8msh3f48e98d42649d3p18bc93jsnf8c45f20029e",
      },
    };

    fetch("https://gym-fit.p.rapidapi.com/v1/exercises", options)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch exercises");
        return res.json();
      })
      .then((data) => {
        setExercises(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading exercises...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <div className="workout-list-page">
      <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#1e3c72" }}>
        Workout Exercises
      </h1>

      <div className="workout-plans-container">
        {exercises.map((exercise) => (
          <div key={exercise.id} className="workout-card" tabIndex={0}>
            <img
              src={exercise.gifUrl || "https://via.placeholder.com/300x220?text=No+Image"}
              alt={exercise.name}
              className="workout-image"
              loading="lazy"
            />
            <div className="card-content">
              <h2>{exercise.name}</h2>
              <p>Type: {exercise.type}</p>
              <p>Muscle: {exercise.muscle}</p>
              <button className="start-button">Start Workout</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkoutList;
