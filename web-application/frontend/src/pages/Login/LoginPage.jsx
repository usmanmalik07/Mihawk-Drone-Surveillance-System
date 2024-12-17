import React, { useState } from "react";
import './LoginPage.css';
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });

      const user = response.data.user;

      // Store user data in localStorage for persistence (excluding password)
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect to the appropriate dashboard based on the user role
      if (user.role === 'admin') {
        navigate("/admin-dashboard");
      } else if (user.role === 'observer') {
        navigate("/observer-dashboard");
      } else if (user.role === 'operator') {
        navigate("/operator-dashboard");
      }else {
        navigate("/"); // Default redirect (or error page)
      }
    } catch (err) {
      console.error("Login failed:", err.response.data);
      setError(err.response.data.error || 'Login failed. Please try again.');
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

export default LoginPage;
