import React, { useState } from "react";
import WorkoutCard from "../components/WorkoutCard";
import MealCard from "../components/MealCard";
import "../styles/workoutdiet.css"; // Updated CSS for full-screen layout

const WorkoutDiet = () => {
  const [workouts] = useState([
    { id: 1, name: "Push-ups", sets: 3, reps: 15, rest: "30 sec", image: "/assets/workouts/pushups.gif" },
    { id: 2, name: "Squats", sets: 4, reps: 12, rest: "45 sec", image: "/assets/workouts/squats.gif" },
    { id: 3, name: "Plank", sets: 3, reps: "45 sec", rest: "30 sec", image: "/assets/workouts/plank.gif" },
  ]);

  const [meals] = useState([
    { id: 1, name: "Oatmeal with Fruits", calories: 350, protein: 10, carbs: 50, image: "/assets/meals/oatmeal.jpg" },
    { id: 2, name: "Grilled Chicken Salad", calories: 450, protein: 40, carbs: 20, image: "/assets/meals/chicken_salad.jpg" },
    { id: 3, name: "Egg Omelette", calories: 300, protein: 25, carbs: 5, image: "/assets/meals/omelette.jpg" },
  ]);

  const [allergy, setAllergy] = useState("");

  const filteredMeals = meals.filter((meal) =>
    allergy ? !meal.name.toLowerCase().includes(allergy.toLowerCase()) : true
  );

  return (
    <div className="workout-diet-container">
      <h1>Workout & Diet Plan</h1>

      <section className="workout-section">
        <h2>Workout Plan</h2>
        <div className="grid-container">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </section>

      <section className="diet-section">
        <h2>Diet Plan</h2>
        <div className="filter-container">
          <label htmlFor="allergyFilter">Filter Allergies:</label>
          <input
            id="allergyFilter"
            type="text"
            placeholder="Enter food to avoid..."
            value={allergy}
            onChange={(e) => setAllergy(e.target.value)}
          />
        </div>
        <div className="grid-container">
          {filteredMeals.length > 0 ? (
            filteredMeals.map((meal) => <MealCard key={meal.id} meal={meal} />)
          ) : (
            <p className="no-results">No meals match your filter.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default WorkoutDiet;
