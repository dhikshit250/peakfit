import React, { useState, useEffect, useContext } from "react";
import WorkoutCard from "../components/WorkoutCard";
import MealCard from "../components/MealCard";
import { AuthContext } from "../context/AuthContext";
import "../styles/today.css";

const Today = () => {
  const { token } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState([]);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/generate/plan", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const dayOne = data.day_1 || {};
          setWorkouts(dayOne.workouts || []);
          setMeals(dayOne.meals || []);
        } else {
          console.error("Failed to fetch plan.");
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchPlan();
  }, [token]);

  if (loading) {
    return (
      <div className="workout-diet-container">
        <h2>Loading your personalized plan...</h2>
      </div>
    );
  }

  return (
    <div className="workout-diet-container">
      <h1>Today's Personalized Plan</h1>

      {/* Workout Section */}
      <section className="workout-section">
        <h2>Workout Plan</h2>
        {workouts.length > 0 ? (
          <div className="grid-container">
            {workouts.map((workout, index) => (
              <WorkoutCard key={index} workout={workout} />
            ))}
          </div>
        ) : (
          <p>No workouts available for today.</p>
        )}
      </section>

      {/* Diet Section */}
      <section className="diet-section">
        <h2>Diet Plan</h2>
        {meals.length > 0 ? (
          <div className="grid-container">
            {meals.map((meal, index) => (
              <MealCard key={index} meal={meal} />
            ))}
          </div>
        ) : (
          <p>No meals available for today.</p>
        )}
      </section>
    </div>
  );
};

export default Today;
