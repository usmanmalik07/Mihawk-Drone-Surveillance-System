import React, { useState } from "react";
import axios from "axios";
import "../RecoverPassword/RecoverPassword.css";
import Footer from "../../components/Footer/Footer";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams(); // grab token from URL
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post(`http://localhost:5000/api/users/reset-password/${token}`, {
        password,
      });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000); // redirect after success
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div>
      <div className="recover-container">
        <div className="recover-box">
          <h2 className="recover-heading">
            Reset <span className="highlight">Password</span>
          </h2>

          {!success ? (
            <form className="recover-form" onSubmit={handleReset}>
              <div className="input-group">
                <label htmlFor="password">New Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="recover-button">
                Reset Password
              </button>
            </form>
          ) : (
            <div className="popup">
              <h3>Password Reset Successful!</h3>
              <p>You’ll be redirected to the login page shortly.</p>
            </div>
          )}

          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
