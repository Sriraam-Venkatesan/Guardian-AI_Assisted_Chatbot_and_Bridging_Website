import React, { useState } from 'react';
import './SignIn.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that fields are not empty
    if (!formData.emailOrPhone || !formData.password) {
      alert('Please fill in all fields!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.emailOrPhone,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed');
      }

      const userData = await response.json();
      const userDataStr = JSON.stringify(userData);

      // Store user info in a Cookie to share across ports on localhost
      const expires = new Date(Date.now() + 7 * 864e5).toUTCString();
      document.cookie = `guardianUser=${encodeURIComponent(userDataStr)}; expires=${expires}; path=/; SameSite=Lax`;

      console.log('Login Successful:', userData);
      alert('Login Successful!');

      // Redirect to Home Page (Always use localhost for cookie consistency)
      window.location.href = 'http://localhost:8000/frontend/Home/HomePage copy.html';



    } catch (error) {
      console.error('Login Error:', error);
      alert(`Login Error: ${error.message}`);
    }
  };


  return (
    <div className="signin-container">
      <div id="box">
        <h1 className="within-box" id="title">Sign in</h1>
        <hr className="within-box" id="line" />

        <form onSubmit={handleSubmit}>
          <div className="within-box" id="cred">
            <p className="headers" id="username">Mail Id or Phone Number</p>
            <input
              className="inputs"
              id="input-mail"
              type="text"
              name="emailOrPhone"
              value={formData.emailOrPhone}
              onChange={handleInputChange}
              placeholder="Enter your Mail Id or Phone Number"
              required
            />
          </div>

          <div className="within-box" id="cred">
            <p className="headers" id="pass">Password</p>
            <input
              className="inputs"
              id="input-pass"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your Password"
              required
            />
          </div>

          <div className="password-toggle">
            <label>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <span> Show Password</span>
            </label>
          </div>

          <hr className="within-box" id="line2" />
          <button type="submit" className="within-box" id="submit-but">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
