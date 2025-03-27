import React from "react";
import "../styles/workoutcard.css";


const WorkoutCard = ({ workout }) => {
  return (
    <div className="workout-card">
      <img src={workout.image} alt={workout.name} />
      <h3>{workout.name}</h3>
      <p><strong>Sets:</strong> {workout.sets} | <strong>Reps:</strong> {workout.reps}</p>
      <p><strong>Rest:</strong> {workout.rest}</p>
    </div>
  );
};

export default WorkoutCard;
