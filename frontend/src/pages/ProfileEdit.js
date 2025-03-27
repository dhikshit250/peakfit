import React, { useState } from "react";
import "../styles/profile.css";
import Header from "../components/Header"; // Import Header component
import profilepic from "../assets/default-profile.png";

const ProfileEdit = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    height: 175, // Default value
    weight: 70,  // Default value
    goal: "Maintain",
    age: 25,     // Default value
    gender: "Male",
    profilePic: "/assets/default-profile.png",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, profilePic: imageUrl });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile Data:", formData);
    alert("Profile updated successfully!");
  };

  return (
    <div className="profile-container">
      <div className="profile-content">
        <h1>Edit Profile</h1>
        <div className="profile-form">
          <div className="profile-pic-container">
            <img src={profilepic} alt="Profile" className="profile-pic" />
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
          <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled
            />

            <label>Height (cm): {formData.height}</label>
            <input
              type="range"
              name="height"
              min="140"
              max="190"
              value={formData.height}
              onChange={handleChange}
              required
            />

            <label>Weight (kg): {formData.weight}</label>
            <input
              type="range"
              name="weight"
              min="40"
              max="150"
              value={formData.weight}
              onChange={handleChange}
              required
            />

            <label>Goal:</label>
            <select name="goal" value={formData.goal} onChange={handleChange}>
              <option value="Bulk">Bulk</option>
              <option value="Cut">Cut</option>
              <option value="Maintain">Maintain</option>
            </select>

            <label>Age: {formData.age}</label>
            <input
              type="range"
              name="age"
              min="16"
              max="60"
              value={formData.age}
              onChange={handleChange}
              required
            />

            <label>Gender:</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
