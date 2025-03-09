import React, { useState } from "react";
import "./LoginPage.css";
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie"; // Make sure js-cookie is installed

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post(
              "http://localhost:5000/api/users/login",
              { email, password },
              { withCredentials: true } // Ensures cookies are sent & received
          );
  
          console.log("Login Response:", response.data);
  
          if (response.data.token && response.data.role) {
              // ✅ Store token and role
              localStorage.setItem("authToken", response.data.token);
              localStorage.setItem("userRole", response.data.role);
  
              // ✅ Redirect based on role
              if (response.data.role === "admin") {
                  navigate("/admin-dashboard", { replace: true });
              } else if (response.data.role === "operator") {
                  navigate("/operator-dashboard", { replace: true });
              } else if (response.data.role === "observer") {
                  navigate("/observer-dashboard", { replace: true });
              } else {
                  setError("Invalid role assigned");
              }
          } else {
              setError("Login failed: No token received");
          }
      } catch (err) {
          console.error("Login failed:", err.response?.data || err.message);
          setError(err.response?.data?.message || "Login failed. Please try again.");
      }
  };

  return (
    <div>
      <NavBar />
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-heading">
            Welcome Back to <span className="highlight">Mihawk</span>
          </h2>
          <form className="login-form" onSubmit={handleLogin}>
            {error && <p className="error">{error}</p>} {/* Display error message */}
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="login-footer">
                Forgot your password? <a href="/recover-password">Recover Account</a>
              </p>
            </div>
            <button type="submit" className="login-button">
              Log In
            </button>
          </form>
          <p className="login-footer">
            Don’t have an account? <a href="/signup">Get Access</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;