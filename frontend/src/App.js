import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ProfileEdit from "./pages/ProfileEdit";
import WorkoutDiet from "./pages/WorkoutDiet";
import Header from "./components/Header";
import "./App.css"; // Add your main styling here
import Footer from "./components/Footer";


function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Header replacing Sidebar */}
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<ProfileEdit />} />
            <Route path="/workout-diet" element={<WorkoutDiet />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
