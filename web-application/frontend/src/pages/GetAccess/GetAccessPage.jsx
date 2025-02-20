import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./GetAccessPage.css";
import Footer from "../../components/Footer/Footer";

const GetAccessPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    note: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form:", formData); // Debugging
  
    emailjs
      .send(
        "service_ngh8wuo",
        "template_mit9vbg",
        formData,
        "Cpb50eEdJDjBgtUhK"
      )
      .then(
        (response) => {
          console.log("Email sent successfully!", response);
          setFormSubmitted(true);
        },
        (error) => {
          console.error("Failed to send email:", error);
          alert("Email sending failed. Check console for details.");
        }
      );
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
                  name="name"
                  placeholder="Enter your full name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label htmlFor="note">Note</label>
                <textarea
                  id="note"
                  name="note"
                  rows="4"
                  placeholder="Why do you need access?"
                  required
                  value={formData.note}
                  onChange={handleChange}
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
              <button className="close-popup" onClick={() => setFormSubmitted(false)}>
                OK
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GetAccessPage;
