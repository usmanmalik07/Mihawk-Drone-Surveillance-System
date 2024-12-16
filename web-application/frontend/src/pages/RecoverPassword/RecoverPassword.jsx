import React, { useState } from "react";
import "./RecoverPassword.css";

const RecoverPassword = () => {
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailSent(true);
  };

  return (
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
              onClick={() => setEmailSent(false)}
            >
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecoverPassword;
