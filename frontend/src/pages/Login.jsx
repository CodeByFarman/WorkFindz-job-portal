import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/login",
        formData,
        { withCredentials: true }
      );
      console.log("Login Success:", response.data);
      // Show success message using Toastify
      toast.success("Login successful!", {
        position: "top-right", // Use string-based positioning
      });
      // Wait for a short time to ensure toast has appeared before redirecting
    setTimeout(() => {
      navigate("/"); // Redirect to homepage
      window.location.reload();
    }, 4000); // Wait for 1.5 seconds before redirecting (adjust the delay as needed)
    } catch (error) {
      console.error("Login Error:", error.response?.data);
      setError(error.response?.data?.message || "Login failed");

      // Show error message using Toastify
      toast.error(
        error.response?.data?.message || "Login failed. Please try again.",
        {
          position: "top-right", // Use string-based positioning
        }
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="auth-button">
            Login
          </button>
          <div className="auth-footer">
            <p>
              Don't have an account?{" "}
              <a href="/signup" className="auth-link">
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;



