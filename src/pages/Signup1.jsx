import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Signup1.css"; // Using existing styling file

const Signup1 = () => {
  const [formData, setFormData] = useState({
    userName: "", // Updated to match API requirement
    email: "",
    password: "",
    role: "FARMER",
    location: "",
    skill: "",
    rating: "",
    name: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    setIsLoading(true);

    try {
      // Direct API call instead of using authService
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/farmer/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          // Ensure rating is sent as a number
          rating: parseFloat(formData.rating)
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed. Please try again.");
      }

      console.log("Signup successful!");
      // Navigate to home page after successful signup
      navigate("/");
    } catch (error) {
      console.error("Signup Error:", error.message);
      setError(error.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup1-body">
      <div className="signup1-container">
        <h2 className="signup1-header">
          <img src="/images/logo.png" alt="Artisan Alley Logo" className="signup1-logo" />
          <span className="signup1-title">Welcome to Maan Meal</span>
        </h2>
        {error && <p className="signup1-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="signup1-input-group">
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Enter your full name" 
              required 
            />
          </div>
          <div className="signup1-input-group">
            <label htmlFor="userName">Username</label>
            <input 
              type="text" 
              id="userName" 
              name="userName" 
              value={formData.userName} 
              onChange={handleChange} 
              placeholder="Enter your username" 
              required 
            />
          </div>
          <div className="signup1-input-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="Enter your email address" 
              required 
            />
          </div>
          <div className="signup1-input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              placeholder="Create a strong password" 
              required 
            />
          </div>
          <div className="signup1-input-group">
            <label htmlFor="location">Location</label>
            <input 
              type="text" 
              id="location" 
              name="location" 
              value={formData.location} 
              onChange={handleChange} 
              placeholder="Enter your location" 
              required 
            />
          </div>
          <div className="signup1-input-group">
            <label htmlFor="skill">Skill</label>
            <input 
              type="text" 
              id="skill" 
              name="skill" 
              value={formData.skill} 
              onChange={handleChange} 
              placeholder="Enter the Crop Type You Grow" 
              required 
            />
          </div>
          <div className="signup1-input-group">
            <label htmlFor="rating">Rating</label>
            <input 
              type="number" 
              id="rating" 
              name="rating" 
              value={formData.rating} 
              onChange={handleChange} 
              placeholder="Rate your expertise (1-5)" 
              min="1" 
              max="5" 
              step="0.1"
              required 
            />
          </div>
          <button 
            type="submit" 
            className="signup1-button"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Sign Up"}
          </button>
        </form>
        <p>
          Already have an account? <a href="/login" className="signup1-link">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup1;