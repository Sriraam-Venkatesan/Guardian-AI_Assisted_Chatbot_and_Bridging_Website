import React, { useState } from 'react';
import './UserRegistration.css';

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    username: '',
    region: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    aadhar: '',
    costPreferences: '',
    profilePicture: null
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const regions = [
    "Ariyalur",
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Salem",
    "Trichy"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prevState => ({
          ...prevState,
          profilePicture: {
            name: file.name,
            type: file.type,
            size: file.size,
            data: reader.result
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.username,
          region: formData.region,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          aadhar: formData.aadhar,
          cost_preferences: formData.costPreferences,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Registration failed');
      }

      const result = await response.json();
      const userDataStr = JSON.stringify(result);

      // Store user info in a Cookie to share across ports on localhost
      const expires = new Date(Date.now() + 7 * 864e5).toUTCString();
      document.cookie = `guardianUser=${encodeURIComponent(userDataStr)}; expires=${expires}; path=/; SameSite=Lax`;

      console.log('Registration Success:', result);
      alert('Registration successful! Welcome to Guardian.');

      // Redirect to Home Page (Always use localhost for cookie consistency)
      window.location.href = 'http://localhost:8000/frontend/Home/HomePage copy.html';


    } catch (error) {
      console.error('Registration Error:', error);
      alert(`Registration Error: ${error.message}`);
    }
  };


  const resetForm = () => {
    setFormData({
      username: '',
      region: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      aadhar: '',
      costPreferences: '',
      profilePicture: null
    });
  };

  return (
    <div className="app-container">
      <center>
        <h1 id="title">User Sign Up</h1>
      </center>

      <div id="box">
        <form onSubmit={handleSubmit}>
          <p className="input-title">Username</p>
          <input
            className="input-box"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Enter your Name"
            required
          />

          <p className="input-title">Region</p>
          <select
            className="input-box"
            name="region"
            value={formData.region}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>Select your region</option>
            {regions.map((region, index) => (
              <option key={index} value={region}>{region}</option>
            ))}
          </select>

          <p className="input-title">Email Id</p>
          <input
            className="input-box"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your Mail Id"
            required
          />

          <p className="input-title">Phone Number</p>
          <input
            className="input-box"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter your Number"
            required
          />

          <p className="input-title">Password</p>
          <div id="password-box">
            <input
              type={showPassword ? "text" : "password"}
              id="password-type"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter Password"
              required
            />
            <i
              className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
              id="eye"
              onClick={() => setShowPassword(!showPassword)}
              style={{ color: '#00000073', marginLeft: '35px', cursor: 'pointer' }}
            ></i>
          </div>

          <p className="input-title">Password Re-confirmation</p>
          <div id="password-box">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="password-type"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your Password"
              required
            />
            <i
              className={`fa-solid ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}
              id="eye"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{ color: '#00000073', marginLeft: '35px', cursor: 'pointer' }}
            ></i>
          </div>

          <p className="input-title">Aadhar Number</p>
          <input
            className="input-box"
            type="text"
            name="aadhar"
            value={formData.aadhar}
            onChange={handleInputChange}
            placeholder="Enter your Aadhar Number"
            required
          />

          <p className="input-title">Cost Preferences</p>
          <input
            className="input-box"
            type="number"
            name="costPreferences"
            value={formData.costPreferences}
            onChange={handleInputChange}
            placeholder="Rs. 00000"
            required
          />

          <p className="input-title">Upload your Display Picture</p>
          <input
            className="profile-pic"
            id="last"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <br />

          <button type="submit">Submit</button>
        </form>
      </div>

      <center>
        <p id="nav">
          Click here to move back to <a href="/">Home</a>
        </p>
      </center>
    </div>
  );
};

export default UserRegistration;
