import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Auth.css"; // Include the CSS file

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "phoneNumber" ? value.replace(/\D/g, "") : value, // Allow only numbers for phoneNumber
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/register",
        {
          ...formData,
          phoneNumber: parseInt(formData.phoneNumber, 10), // Convert phoneNumber to a number
        }
      );

      // Show success message using Toastify
      toast.success("Signup successful!", {
        position: "top-right", // Use string-based positioning
      });

      // Reset form fields after successful submission
      setFormData({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
      });
    } catch (error) {
      console.error("Error response:", error.response?.data);

      // Show error message using Toastify
      toast.error(
        error.response?.data?.message || "Signup failed. Please try again.",
        {
          position: "top-right", // Use string-based positioning
        }
      );
    }
  };

  return (
    <div className="auth-container">
      {/* ToastContainer initialization */}
      <ToastContainer />
      <div className="auth-card">
        <h2 className="auth-title">Create Your Account</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Enter your full name"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="auth-button">
            Sign Up
          </button>
          <div className="auth-footer">
            <p>
              Already have an account?{" "}
              <a href="/login" className="auth-link">
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
