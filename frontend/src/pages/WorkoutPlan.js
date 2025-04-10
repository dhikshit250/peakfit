import React, { useState,useEffect, useContext } from "react";
import axios from "axios";
import Select from "react-select";
import { AuthContext } from "../context/AuthContext";
import "../styles/workoutplan.css";

// Options
const daysOptions = [
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
  { value: "Sunday", label: "Sunday" },
];

const typeOptions = [
  { value: "Strength Training", label: "Strength Training" },
  { value: "Cardio", label: "Cardio" },
  { value: "HIIT", label: "HIIT" },
  { value: "Yoga", label: "Yoga" },
];

const intensityOptions = [
  { value: "Light", label: "Light" },
  { value: "Moderate", label: "Moderate" },
  { value: "Intense", label: "Intense" },
];

const muscleGroupOptions = [
  { value: "Chest", label: "Chest" },
  { value: "Back", label: "Back" },
  { value: "Legs", label: "Legs" },
  { value: "Arms", label: "Arms" },
  { value: "Shoulders", label: "Shoulders" },
  { value: "Core", label: "Core" },
];

const equipmentOptions = [
  { value: "Dumbbells", label: "Dumbbells" },
  { value: "Barbell", label: "Barbell" },
  { value: "Resistance Bands", label: "Resistance Bands" },
  { value: "Kettlebells", label: "Kettlebells" },
  { value: "None", label: "None" },
  { value: "Bodyweight", label: "Bodyweight" },
];

// Exercises per muscle group
const exerciseOptions = {
  Chest: [
    { value: "Push-ups", label: "Push-ups" },
    { value: "Bench Press", label: "Bench Press" },
    { value: "Chest Fly", label: "Chest Fly" },
  ],
  Back: [
    { value: "Pull-ups", label: "Pull-ups" },
    { value: "Deadlift", label: "Deadlift" },
    { value: "Bent-over Rows", label: "Bent-over Rows" },
  ],
  Legs: [
    { value: "Squats", label: "Squats" },
    { value: "Lunges", label: "Lunges" },
    { value: "Leg Press", label: "Leg Press" },
  ],
  Arms: [
    { value: "Bicep Curls", label: "Bicep Curls" },
    { value: "Tricep Dips", label: "Tricep Dips" },
    { value: "Hammer Curls", label: "Hammer Curls" },
  ],
  Shoulders: [
    { value: "Shoulder Press", label: "Shoulder Press" },
    { value: "Lateral Raises", label: "Lateral Raises" },
    { value: "Front Raises", label: "Front Raises" },
  ],
  Core: [
    { value: "Plank", label: "Plank" },
    { value: "Crunches", label: "Crunches" },
    { value: "Russian Twists", label: "Russian Twists" },
  ],
};

const WorkoutPlan = () => {
  const { token } = useContext(AuthContext);
  const [workoutPlan, setWorkoutPlan] = useState({
    days: [],
    restDays: [],
    intensity: intensityOptions[1],
    duration: 45,
    type: typeOptions[0],
    muscleGroup: null,
    exercises: [],
    calorieGoal: 500,
    equipment: null,
    reminders: false,
    trainerAccess: false,
    progressiveOverload: false,
    warmUpCoolDown: true,
  });

  useEffect(() => {
    const fetchWorkoutPlan = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5000/api/workout/workout_plans", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data;

        
      if (data) {
        setWorkoutPlan({
          days: data.workout_days || [],
          restDays: data.rest_days || [],
          intensity: data.intensity || "",
          duration: data.duration || 0,
          type: data.workout_type || "",
          muscleGroup: data.muscle_groups || [],
          exercises: data.exercises || [],
          calorieGoal: data.calorie_burn_goal || 0,
          equipment: data.equipment || [],
          reminders: data.reminders || false,
          trainerAccess: data.trainer_access || false,
          progressiveOverload: data.progressive_overload || false,
          warmUpCoolDown: data.warmup_cooldown || false,
        });
      }

      } catch (error) {
        console.error("No workout plan found or error loading:", error.response?.data || error.message);
      }
    };

    fetchWorkoutPlan();
  }, [token]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setWorkoutPlan((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (selected, name) => {
    setWorkoutPlan((prev) => ({
      ...prev,
      [name]: selected,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedPlan = {
      days: workoutPlan.days.map((d) => d.value).join(", "),
      restDays: workoutPlan.restDays.map((d) => d.value).join(", "),
      intensity: workoutPlan.intensity?.value,
      duration: parseInt(workoutPlan.duration),
      type: workoutPlan.type?.value,
      muscleGroup: workoutPlan.muscleGroup?.value || "",
      exercises: workoutPlan.exercises.map((e) => e.value).join(", "),
      calorieGoal: parseInt(workoutPlan.calorieGoal),
      equipment: workoutPlan.equipment?.value || "",
      reminders: workoutPlan.reminders,
      trainerAccess: workoutPlan.trainerAccess,
      progressiveOverload: workoutPlan.progressiveOverload,
      warmUpCoolDown: workoutPlan.warmUpCoolDown,
    };

    try {
      await axios.post("http://127.0.0.1:5000/api/workout/workout_plans", formattedPlan, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Workout Plan Saved!");
      setWorkoutPlan({
        days: [],
        restDays: [],
        intensity: intensityOptions[1],
        duration: 45,
        type: typeOptions[0],
        muscleGroup: null,
        exercises: [],
        calorieGoal: 500,
        equipment: null,
        reminders: false,
        trainerAccess: false,
        progressiveOverload: false,
        warmUpCoolDown: true,
      });
    } catch (err) {
      console.error("Error saving workout plan:", err);
      alert("Failed to save plan. Check console for error.");
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#111111",
      borderColor: "#444",
      color: "#fff",
      fontSize: "1rem",
      borderRadius: "8px",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#111111",
      color: "#fff",
      borderRadius: "8px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#fbc02d"
        : state.isFocused
        ? "#444"
        : "#111111",
      color: "#ffffff",
      padding: "10px",
      borderRadius: "5px",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fff",
    }),
  };

  return (
    <div className="workout-plan-container">
      <div className="workout-plan-content">
        <h1>Create Your Workout Plan</h1>
        <form onSubmit={handleSubmit} className="workout-plan-form">
          <label>Workout Days:</label>
          <Select
            isMulti
            options={daysOptions}
            value={workoutPlan.days}
            onChange={(selected) => handleSelectChange(selected, "days")}
            styles={customStyles}
          />

          <label>Rest Days:</label>
          <Select
            isMulti
            options={daysOptions}
            value={workoutPlan.restDays}
            onChange={(selected) => handleSelectChange(selected, "restDays")}
            styles={customStyles}
          />

          <label>Intensity:</label>
          <Select
            options={intensityOptions}
            value={workoutPlan.intensity}
            onChange={(selected) => handleSelectChange(selected, "intensity")}
            styles={customStyles}
          />

          <label>Duration (minutes):</label>
          <input
            type="number"
            name="duration"
            value={workoutPlan.duration}
            onChange={handleChange}
            min="15"
            max="120"
            required
          />

          <label>Workout Type:</label>
          <Select
            options={typeOptions}
            value={workoutPlan.type}
            onChange={(selected) => handleSelectChange(selected, "type")}
            styles={customStyles}
          />

          <label>Muscle Group Focus:</label>
          <Select
            options={muscleGroupOptions}
            value={workoutPlan.muscleGroup}
            onChange={(selected) => handleSelectChange(selected, "muscleGroup")}
            styles={customStyles}
          />

          <label>Exercises:</label>
          <Select
            isMulti
            options={
              workoutPlan.muscleGroup
                ? exerciseOptions[workoutPlan.muscleGroup.value]
                : []
            }
            value={workoutPlan.exercises}
            onChange={(selected) => handleSelectChange(selected, "exercises")}
            styles={customStyles}
          />

          <label>Calorie Burn Goal:</label>
          <input
            type="number"
            name="calorieGoal"
            value={workoutPlan.calorieGoal}
            onChange={handleChange}
            min="100"
            max="1000"
            required
          />

          <label>Equipment:</label>
          <Select
            options={equipmentOptions}
            value={workoutPlan.equipment}
            onChange={(selected) => handleSelectChange(selected, "equipment")}
            styles={customStyles}
          />

          <label>Workout Reminder:</label>
          <input
            type="checkbox"
            name="reminders"
            checked={workoutPlan.reminders}
            onChange={handleChange}
          />

          <label>Trainer Access:</label>
          <input
            type="checkbox"
            name="trainerAccess"
            checked={workoutPlan.trainerAccess}
            onChange={handleChange}
          />

          <label>Progressive Overload:</label>
          <input
            type="checkbox"
            name="progressiveOverload"
            checked={workoutPlan.progressiveOverload}
            onChange={handleChange}
          />

          <label>Include Warm-Up & Cool-Down:</label>
          <input
            type="checkbox"
            name="warmUpCoolDown"
            checked={workoutPlan.warmUpCoolDown}
            onChange={handleChange}
          />

          <button type="submit" className="submit-btn">
            Save Plan
          </button>
        </form>
      </div>
    </div>
  );
};

export default WorkoutPlan;
