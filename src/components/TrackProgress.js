import React from "react";

function estimateCalories(workoutName) {
  const name = workoutName.toLowerCase();

  if (name.includes("push")) return 150;
  if (name.includes("squat")) return 180;
  if (name.includes("jump")) return 100;
  if (name.includes("run")) return 200;
  if (name.includes("plank")) return 120;
  return 100;
}

function TrackProgress({ workouts = [], selectedWorkouts = {} }) {
  const totalWorkouts = workouts.length;
  const completedWorkouts = workouts.filter(
    (w) => selectedWorkouts[w.name]
  ).length;

  const caloriesBurned = workouts.reduce((sum, workout) => {
    if (selectedWorkouts[workout.name]) {
      return sum + (workout.calories || estimateCalories(workout.name));
    }
    return sum;
  }, 0);

  const progressPercent =
    totalWorkouts === 0 ? 0 : (completedWorkouts / totalWorkouts) * 100;

  return (
    <div
      style={{
        maxWidth: "520px",
        margin: "40px auto",
        padding: "30px 35px",
        borderRadius: "20px",
        background: "linear-gradient(135deg, #4c6ef5 0%, #15aabf 100%)",
        boxShadow:
          "0 8px 30px rgba(21, 170, 191, 0.4), 0 4px 15px rgba(21, 170, 191, 0.3)",
        color: "#fff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        userSelect: "none",
      }}
    >
      <h2
        style={{
          fontWeight: "700",
          fontSize: "28px",
          letterSpacing: "1.1px",
          marginBottom: "25px",
          textAlign: "center",
          textShadow: "0 1px 3px rgba(0,0,0,0.3)",
        }}
      >
        Workout Progress Tracker
      </h2>

      <div
        style={{
          background: "rgba(255, 255, 255, 0.15)",
          borderRadius: "15px",
          overflow: "hidden",
          height: "28px",
          boxShadow: "inset 0 2px 5px rgba(255,255,255,0.3)",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            width: `${progressPercent}%`,
            height: "100%",
            background: "linear-gradient(90deg, #69db7c 0%, #00b894 100%)",
            borderRadius: "15px 0 0 15px",
            transition: "width 0.5s ease-in-out",
            boxShadow:
              "0 0 10px 2px rgba(105,219,124,0.7), inset 0 -2px 8px rgba(0,0,0,0.2)",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "600",
          fontSize: "16px",
          marginBottom: "12px",
          letterSpacing: "0.5px",
          textShadow: "0 1px 2px rgba(0,0,0,0.25)",
        }}
      >
        <span>
          Completed:{" "}
          <span style={{ color: "#dff9fb" }}>
            {completedWorkouts} / {totalWorkouts}
          </span>
        </span>
        <span>
          Calories Burned:{" "}
          <span style={{ color: "#dff9fb" }}>{caloriesBurned} kcal</span>
        </span>
      </div>

      {completedWorkouts === totalWorkouts && totalWorkouts > 0 && (
        <div
          style={{
            marginTop: "30px",
            padding: "18px",
            background: "linear-gradient(135deg, #00b894 0%, #38ada9 100%)",
            borderRadius: "15px",
            textAlign: "center",
            fontWeight: "700",
            fontSize: "20px",
            color: "#fff",
            boxShadow:
              "0 0 15px 5px rgba(0,184,148,0.7), 0 0 10px rgba(0,0,0,0.2)",
            userSelect: "none",
          }}
        >
          🎉 Congratulations! All Workouts Completed! 🎉
        </div>
      )}
    </div>
  );
}

export default TrackProgress;
