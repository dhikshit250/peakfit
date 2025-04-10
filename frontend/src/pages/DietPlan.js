import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/dietPlan.css";

const DietPlan = () => {
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    dietType: "Balanced",
    carbPreference: "Moderate-carb",
    allergies: "",
    mealFrequency: "3 meals/day",
    cheatMeals: 2,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDietPlan = async () => {
      if (!token) {
        alert("No token found. Please log in.");
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:5000/api/diet/diet-plan", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFormData({
            dietType: data.diet_type || "Balanced",
            carbPreference: data.carb_preference || "Moderate-carb",
            allergies: data.allergies || "",
            mealFrequency: data.meal_frequency || "3 meals/day",
            cheatMeals: data.cheat_meals || 2,
          });
        } else {
          alert("Failed to fetch your diet plan.");
        }
      } catch (error) {
        console.error("Error fetching diet plan:", error);
      }
    };

    fetchDietPlan();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "cheatMeals" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dietPlanData = {
      diet_type: formData.dietType,
      carb_preference: formData.carbPreference,
      allergies: formData.allergies,
      meal_frequency: formData.mealFrequency,
      cheat_meals: formData.cheatMeals,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/api/diet/diet-plan", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dietPlanData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("✅ Diet Plan updated successfully!");
      } else {
        alert("⚠️ Error: " + (result.error || "Unknown error occurred"));
      }
    } catch (error) {
      console.error("❌ Error saving diet plan:", error);
      alert("⚠️ Network error, please try again later.");
    } finally {
      setLoading(false);
    }
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

          <label>Carbohydrate Preference:</label>
          <select name="carbPreference" value={formData.carbPreference} onChange={handleChange}>
            <option value="Low-carb">Low-carb</option>
            <option value="Moderate-carb">Moderate-carb</option>
            <option value="High-carb">High-carb</option>
          </select>

          <label>Food Allergies (if any):</label>
          <input
            type="text"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            placeholder="E.g., Nuts, Dairy, Gluten"
          />

          <label>Meal Frequency:</label>
          <select name="mealFrequency" value={formData.mealFrequency} onChange={handleChange}>
            <option value="3 meals/day">3 meals/day</option>
            <option value="5 small meals/day">5 small meals/day</option>
            <option value="2 large meals/day">2 large meals/day</option>
          </select>

          <label>Cheat Meals Per Week:</label>
          <input
            type="number"
            name="cheatMeals"
            value={formData.cheatMeals}
            onChange={handleChange}
            min="0"
          />

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Saving..." : "Save Diet Plan"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DietPlan;
