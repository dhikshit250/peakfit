import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/workoutplan.css";

const WorkoutPlan = ({ userId }) => {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [workoutPlan, setWorkoutPlan] = useState({
    days: "",
    intensity: "Moderate",
    duration: 45,
    type: "Strength Training",
    muscleGroup: "Full Body",
    exercises: "Predefined Plan",
    restDays: "",
    calorieGoal: 500,
    equipment: "",
    reminders: false,
    trainerAccess: false,
    progressiveOverload: false,
    warmUpCoolDown: true,
  });

  // ✅ Fetch workout plans from the backend
  useEffect(() => {
    axios.get(`http://localhost:5000/workout_plans/${userId}`)
      .then(response => setWorkoutPlans(response.data))
      .catch(error => console.error("Error fetching workout plans:", error));
  }, [userId]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === "checkbox") {
      setWorkoutPlan({ ...workoutPlan, [name]: checked });
    } else {
      setWorkoutPlan({ ...workoutPlan, [name]: value });
    }
  };

  // ✅ Submit workout plan to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formattedPlan = {
      ...workoutPlan,
      user_id: userId,
      days: workoutPlan.days.split(",").map(day => day.trim()),  // Convert string to array
      restDays: workoutPlan.restDays.split(",").map(day => day.trim()),
      equipment: workoutPlan.equipment.split(",").map(item => item.trim())
    };

    try {
      const response = await axios.post("http://localhost:5000/workout_plans", formattedPlan);
      alert("Workout Plan Saved!");
      setWorkoutPlans([...workoutPlans, response.data]);  // Update UI
    } catch (error) {
      console.error("Error saving workout plan:", error);
    }
  };

  // ✅ Delete a workout plan
  const handleDelete = async (planId) => {
    try {
      await axios.delete(`http://localhost:5000/workout_plans/${planId}`);
      setWorkoutPlans(workoutPlans.filter(plan => plan.id !== planId));
    } catch (error) {
      console.error("Error deleting workout plan:", error);
    }
  };

  return (
    <div className="workout-plan-page">
      <h2>Workout Plan</h2>

      {/* Form to Create Workout Plan */}
      <form onSubmit={handleSubmit}>
        <label>Workout Days:</label>
        <input type="text" name="days" value={workoutPlan.days} onChange={handleChange} placeholder="e.g., Monday, Wednesday, Friday" />

        <label>Rest Days:</label>
        <input type="text" name="restDays" value={workoutPlan.restDays} onChange={handleChange} placeholder="e.g., Sunday" />

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

        <label>Exercises:</label>
        <input type="text" name="exercises" value={workoutPlan.exercises} onChange={handleChange} placeholder="e.g., Squats, Push-ups" />

        <label>Calorie Burn Goal:</label>
        <input type="number" name="calorieGoal" value={workoutPlan.calorieGoal} onChange={handleChange} min="100" max="1000" />

        <label>Equipment (comma-separated):</label>
        <input type="text" name="equipment" value={workoutPlan.equipment} onChange={handleChange} placeholder="e.g., Dumbbells, Resistance Bands" />

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

      {/* List of Saved Workout Plans */}
      <h3>Your Workout Plans</h3>
      <ul>
        {workoutPlans.map(plan => (
          <li key={plan.id}>
            {plan.type} - {plan.intensity} ({plan.duration} mins)
            <button onClick={() => handleDelete(plan.id)}>❌ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutPlan;
