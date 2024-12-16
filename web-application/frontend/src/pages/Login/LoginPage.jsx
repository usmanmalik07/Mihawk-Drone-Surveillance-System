import React from "react";
import './LoginPage.css';
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
    const navigate = useNavigate(); // Initialize the navigate function

  const handleLogin = (e) => {
    e.preventDefault();
  navigate("/admin-dashboard");
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
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
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
