import React, { useState } from "react";
import "./Settings.css";
import Sidebar from "../../components/Sidebar/Sidebar"; // Sidebar ko import kiya
import Footer from "../../components/Footer/Footer";

const SettingsPage = () => {
  const [name, setName] = useState("John Doe"); // Default name
  const [email, setEmail] = useState("john@example.com"); // Default email
  const [password, setPassword] = useState("********"); // For password update
  const [isEditingName, setIsEditingName] = useState(false); // Edit mode for name
  const [isEditingEmail, setIsEditingEmail] = useState(false); // Edit mode for email
  const [isEditingPassword, setIsEditingPassword] = useState(false); // Edit mode for password
  const [message, setMessage] = useState(""); // Success/error message

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate updating user details (replace with API call)
    setMessage("Details updated successfully!");
    setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
  };

  return (
    <div className="footer">
      <div className="main">
        <div className="Side">
          <Sidebar />
        </div>
        <div className="settings-page">
          {/* Settings Title */}
          <h2 className="settings-title">Settings</h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="settings-form">
            {/* Name Field */}
            <div className="form-group">
              <label>Name</label>
              <div className="input-group">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  readOnly={!isEditingName} // Read-only unless editing
                  className={isEditingName ? "editable" : ""}
                />
                <button
                  type="button"
                  className="edit-button"
                  onClick={() => setIsEditingName(!isEditingName)}
                >
                  {isEditingName ? "Save" : "Edit"}
                </button>
              </div>
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label>Email</label>
              <div className="input-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  readOnly={!isEditingEmail} // Read-only unless editing
                  className={isEditingEmail ? "editable" : ""}
                />
                <button
                  type="button"
                  className="edit-button"
                  onClick={() => setIsEditingEmail(!isEditingEmail)}
                >
                  {isEditingEmail ? "Save" : "Edit"}
                </button>
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label>New Password</label>
              <div className="input-group">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  readOnly={!isEditingPassword} // Read-only unless editing
                  className={isEditingPassword ? "editable" : ""}
                />
                <button
                  type="button"
                  className="edit-button"
                  onClick={() => setIsEditingPassword(!isEditingPassword)}
                >
                  {isEditingPassword ? "Save" : "Edit"}
                </button>
              </div>
            </div>

            {/* Success Message */}
            {message && <p className="message">{message}</p>}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SettingsPage;