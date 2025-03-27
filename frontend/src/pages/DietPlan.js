import React, { useState } from "react";
import "../styles/dietPlan.css";

const DietPlan = () => {
  const [formData, setFormData] = useState({
    dietType: "Balanced",
    calorieGoal: 2000,
    proteinGoal: 100,
    carbPreference: "Moderate-carb",
    fatPreference: "Balanced",
    allergies: "",
    mealFrequency: "3 meals/day",
    waterIntake: "3L",
    fastingMode: "None",
    cheatMeals: 2,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Diet Plan:", formData);
    alert("Diet Plan Updated!");
  };

  return (
    <div className="diet-plan-container">
      <div className="diet-plan-content">
        <h1>Customize Your Diet Plan</h1>
        <form className="diet-plan-form" onSubmit={handleSubmit}>
          <label>Diet Type:</label>
          <select name="dietType" value={formData.dietType} onChange={handleChange}>
            <option value="Vegan">Vegan</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
            <option value="Keto">Keto</option>
            <option value="Paleo">Paleo</option>
            <option value="Balanced">Balanced</option>
          </select>

          <label>Daily Caloric Intake Goal:</label>
          <input type="number" name="calorieGoal" value={formData.calorieGoal} onChange={handleChange} />

          <label>Daily Protein Intake (grams):</label>
          <input type="number" name="proteinGoal" value={formData.proteinGoal} onChange={handleChange} />

          <label>Carbohydrate Preference:</label>
          <select name="carbPreference" value={formData.carbPreference} onChange={handleChange}>
            <option value="Low-carb">Low-carb</option>
            <option value="Moderate-carb">Moderate-carb</option>
            <option value="High-carb">High-carb</option>
          </select>

          <label>Fat Intake Preference:</label>
          <select name="fatPreference" value={formData.fatPreference} onChange={handleChange}>
            <option value="Low-fat">Low-fat</option>
            <option value="Balanced">Balanced</option>
            <option value="High-fat">High-fat</option>
          </select>

          <label>Food Allergies (if any):</label>
          <input type="text" name="allergies" value={formData.allergies} onChange={handleChange} placeholder="E.g., Nuts, Dairy, Gluten" />

          <label>Meal Frequency:</label>
          <select name="mealFrequency" value={formData.mealFrequency} onChange={handleChange}>
            <option value="3 meals/day">3 meals/day</option>
            <option value="5 small meals/day">5 small meals/day</option>
            <option value="2 large meals/day">2 large meals/day</option>
          </select>

          <label>Daily Water Intake:</label>
          <input type="text" name="waterIntake" value={formData.waterIntake} onChange={handleChange} />

          <label>Intermittent Fasting Mode:</label>
          <select name="fastingMode" value={formData.fastingMode} onChange={handleChange}>
            <option value="None">None</option>
            <option value="16:8">16:8</option>
            <option value="5:2">5:2</option>
          </select>

          <label>Cheat Meals Per Week:</label>
          <input type="number" name="cheatMeals" value={formData.cheatMeals} onChange={handleChange} />

          <button type="submit" className="submit-btn">Save Diet Plan</button>
        </form>
      </div>
    </div>
  );
};

export default DietPlan;
