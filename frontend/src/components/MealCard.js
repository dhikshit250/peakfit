import React from "react";
import "../styles/workoutcard.css";

const MealCard = ({ meal }) => {
  return (
    <div className="meal-card">
      <img src={meal.image} alt={meal.name} />
      <h3>{meal.name}</h3>
      <p><strong>Calories:</strong> {meal.calories} kcal</p>
      <p><strong>Protein:</strong> {meal.protein} g</p>
      <p><strong>Carbs:</strong> {meal.carbs} g</p>
    </div>
  );
};

export default MealCard;
