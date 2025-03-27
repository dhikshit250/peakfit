import React, { useState } from "react";
import "../styles/workoutplan.css";

const WorkoutPlan = () => {
  const [workoutPlan, setWorkoutPlan] = useState({
    days: [],
    intensity: "Moderate",
    duration: 45,
    type: "Strength Training",
    muscleGroup: "Full Body",
    exercises: "Predefined Plan",
    restDays: [],
    calorieGoal: 500,
    equipment: [],
    reminders: false,
    trainerAccess: false,
    progressiveOverload: false,
    warmUpCoolDown: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setWorkoutPlan({ ...workoutPlan, [name]: checked });
    } else {
      setWorkoutPlan({ ...workoutPlan, [name]: value });
    }
  };

  return (
    <div className="workout-plan-page">
      <h2>Workout Plan</h2>
      <form>
        <label>Workout Days:</label>
        <input type="text" name="days" value={workoutPlan.days} onChange={handleChange} placeholder="e.g., Monday, Wednesday, Friday" />

        <label>Intensity:</label>
        <select name="intensity" value={workoutPlan.intensity} onChange={handleChange}>
          <option value="Light">Light</option>
          <option value="Moderate">Moderate</option>
          <option value="Intense">Intense</option>
        </select>

        <label>Duration (minutes):</label>
        <input type="number" name="duration" value={workoutPlan.duration} onChange={handleChange} min="15" max="120" />

        <label>Workout Type:</label>
        <select name="type" value={workoutPlan.type} onChange={handleChange}>
          <option value="Strength Training">Strength Training</option>
          <option value="Cardio">Cardio</option>
          <option value="HIIT">HIIT</option>
          <option value="Yoga">Yoga</option>
        </select>

        <label>Muscle Group Focus:</label>
        <input type="text" name="muscleGroup" value={workoutPlan.muscleGroup} onChange={handleChange} placeholder="e.g., Chest, Legs, Full Body" />

        <label>Calorie Burn Goal:</label>
        <input type="number" name="calorieGoal" value={workoutPlan.calorieGoal} onChange={handleChange} min="100" max="1000" />

        <label>Workout Reminder:</label>
        <input type="checkbox" name="reminders" checked={workoutPlan.reminders} onChange={handleChange} />

        <label>Trainer Access:</label>
        <input type="checkbox" name="trainerAccess" checked={workoutPlan.trainerAccess} onChange={handleChange} />

        <label>Progressive Overload:</label>
        <input type="checkbox" name="progressiveOverload" checked={workoutPlan.progressiveOverload} onChange={handleChange} />

        <label>Include Warm-Up & Cool-Down:</label>
        <input type="checkbox" name="warmUpCoolDown" checked={workoutPlan.warmUpCoolDown} onChange={handleChange} />

        <button type="submit" className="save-btn">Save Plan</button>
      </form>
    </div>
  );
};

export default WorkoutPlan;
