import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/profile.css";
import defaultProfilePic from "../assets/default-profile.png";

const ProfileEdit = () => {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    height: 175,
    weight: 70,
    goal: "Maintain",
    age: 25,
    gender: "Male",
    profilePic: defaultProfilePic,
  });

  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/profile/get-profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const result = await response.json();
          setFormData({
            ...result,
            profilePic: result.profile_pic || defaultProfilePic,
          });
        } else {
          console.warn("Profile not found or unauthorized.");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (token) fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "height" || name === "weight" || name === "age" ? Number(value) : value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, profilePic: imageUrl });
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", file);
    cloudinaryFormData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/djpi1cn50/image/upload", {
        method: "POST",
        body: cloudinaryFormData,
      });

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = formData.profilePic;

    if (selectedFile) {
      const uploadedImageUrl = await uploadImageToCloudinary(selectedFile);
      if (uploadedImageUrl) {
        imageUrl = uploadedImageUrl;
      }
    }

    const profileData = new FormData();
    profileData.append("name", formData.name);
    profileData.append("height", formData.height);
    profileData.append("weight", formData.weight);
    profileData.append("goal", formData.goal);
    profileData.append("age", formData.age);
    profileData.append("gender", formData.gender);
    profileData.append("profile_pic", imageUrl);

    console.log("🔐 Submitting with token:", token);
    for (let [key, value] of profileData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/profile/save-profile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: profileData,
      });

      const result = await response.json();
      if (response.ok) {
        alert("✅ Profile updated successfully!");
        setFormData({ ...formData, profilePic: imageUrl });
      } else {
        alert("⚠️ Error: " + result.error);
      }
    } catch (error) {
      console.error("❌ Error saving profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-content">
        <h1>Edit Profile</h1>
        <div className="profile-form">
          <div className="profile-pic-container">
            <img src={formData.profilePic} alt="Profile" className="profile-pic" />
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
          <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />

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

            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
