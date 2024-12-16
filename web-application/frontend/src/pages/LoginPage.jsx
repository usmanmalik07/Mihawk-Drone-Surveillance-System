import React from 'react';
import * as Component from '../components/LoginComponent';
import '../styles/LoginPage.css';
import Navbar from '../components/navbar';

export default function LoginPage() {
  return (
    <div className="bg-color">
      <Navbar />
      <div className="login-app">
        <div className="container">
          {/* Login Form */}
          <div className="signin-container">
            <form className="login-form">
              <h2 className="heading">Login</h2>

              {/* Email input field */}
              <Component.Input type="email" placeholder="Email / Username" required />

              {/* Password input field */}
              <Component.Input type="password" placeholder="Password" required />

              {/* Remember Me checkbox and Forgot Password link */}
              <div className="forgot-remember">
                <label className="remember">
                  <input type="checkbox" id="remember-me" name="remember-me" /> Remember Me
                </label>
                <a href="#" className="forgot">
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <Component.Button className="bt">LOG IN</Component.Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
