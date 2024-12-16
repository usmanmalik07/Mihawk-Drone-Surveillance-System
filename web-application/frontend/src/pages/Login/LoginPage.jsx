import React, { useState } from "react";
import './LoginPage.css';
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your backend login route
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Save the JWT token in localStorage
      const { token, role } = response.data;
      localStorage.setItem("authToken", token);

      // Redirect user based on their role
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "operator") {
        navigate("/operator-dashboard");
      } else if (role === "observer") {
        navigate("/observer-dashboard");
      } else {
        setError("Invalid role, contact the administrator.");
      }
    } catch (err) {
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
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="login-button">
              Log In
            </button>
          </form>
          <p className="login-footer">
            Forgot your password? <a href="/recover-password">Recover Account</a>
          </p>
          <p className="login-footer">
            Don’t have an account? <a href="/signup">Get Access</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
