import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import DietPlan from "./pages/DietPlan"; 
import Progress from "./pages/Progress";
import WorkoutPlan from "./pages/WorkoutPlan";
import ProfileEdit from "./pages/ProfileEdit"; // Added ProfileEdit
import Today from "./pages/Today"; // Added WorkoutDiet
import "./App.css"; // Add your main styling here

function App() {
  // Load login state from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // Update localStorage when isLoggedIn changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfileEdit />} /> {/* ✅ Added ProfileEdit */}
        <Route path="/tplan" element={<Today/>} /> {/* ✅ Added WorkoutDiet */}
        <Route path="/settings" element={<Settings/>} />
        <Route path="/workout-plan" element={<WorkoutPlan />} />
        <Route path="/diet-plan" element={<DietPlan />} />
        <Route path="/progress" element={<Progress />} />


      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
