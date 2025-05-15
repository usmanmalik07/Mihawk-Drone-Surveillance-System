import React, { useState } from "react";
import axios from "axios"; // Make sure you import Axios
import "./RecoverPassword.css";
import Footer from "../../components/Footer/Footer";

const RecoverPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send POST request to backend to trigger forgot-password process
    try {
      const response = await axios.post('http://localhost:5000/api/users/forgot-password', { email });
      setEmailSent(true);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div>
      <div className="recover-container">
        <div className="recover-box">
          <h2 className="recover-heading">
            Recover Your <span className="highlight">Account</span>
          </h2>
          {!emailSent ? (
            <form className="recover-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="email">Enter your Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state
                  required
                />
              </div>
              <button type="submit" className="recover-button">
                Send Email
              </button>
            </form>
          ) : (
            <div className="popup">
              <h3>Email Sent Successfully!</h3>
              <p>
                Please check your inbox for further instructions to recover your
                account.
              </p>
              <button
                className="close-popup"
                onClick={() => setEmailSent(false)} // Reset email sent state
              >
                OK
              </button>
            </div>
          )}

          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RecoverPassword;
