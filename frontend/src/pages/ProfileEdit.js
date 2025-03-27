import React, { useState } from "react";
import "../styles/profile.css";
import Header from "../components/Header"; // Import Header component
import profilepic from "../assets/default-profile.png";

const ProfileEdit = () => {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    height: "175",
    weight: "70",
    goal: "Maintain",
    age: "25",
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
        <br />
        <div className="profile-form">
          <div className="profile-pic-container">
            <img src= {profilepic} alt="Profile" className="profile-pic" />
            <br />
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
          <br />
          <form onSubmit={handleSubmit}>
            <label>Name:</label>
            
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            <br /><br />

            <label>Email:</label>
            
            <input type="email" name="email" value={formData.email} onChange={handleChange} required disabled />
            <br /><br />

            <label>Height (cm):</label>
            
            <input type="number" name="height" value={formData.height} onChange={handleChange} required />
            <br /><br />

            <label>Weight (kg):</label>
            
            <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />
            <br /><br />

            <label>Goal:</label>
            <select name="goal" value={formData.goal} onChange={handleChange}>
              <option value="Bulk">Bulk</option>
              <option value="Cut">Cut</option>
              <option value="Maintain">Maintain</option>
            </select>
            <br /><br />

            <label>Age:</label>
            
            <input type="number" name="age" value={formData.age} onChange={handleChange} required />
            <br /><br />

            <label>Gender:</label>
            
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <br /><br />

            <button type="submit" className="save-btn">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
