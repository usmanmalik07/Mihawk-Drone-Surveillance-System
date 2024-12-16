import React, { useState } from "react";
import "./GetAccessPage.css";
import Footer from "../../components/Footer/Footer";
const GetAccessPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div>
    <div className="access-container">
      <div className="access-box">
        <h2 className="access-heading">
          Request <span className="highlight">Access</span>
        </h2>
        {!formSubmitted ? (
          <form className="access-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                required
              />
            </div>
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
              <label htmlFor="note">Note</label>
              <textarea
                id="note"
                rows="4"
                placeholder="Why do you need access?"
                required
              ></textarea>
            </div>
            <button type="submit" className="access-button">
              Request Access
            </button>
          </form>
        ) : (
          <div className="popup">
            <h3>Request Sent!</h3>
            <p>Your request for access has been submitted successfully.</p>
            <button
              className="close-popup"
              onClick={() => setFormSubmitted(false)}
            >
              OK
            </button>
          </div>
        )}
      </div>
      
    </div>
    <Footer/>
    </div>
  );
};

export default GetAccessPage;
