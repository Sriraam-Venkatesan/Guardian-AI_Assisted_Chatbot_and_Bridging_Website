import React, { useState } from 'react';
import './AdvocateRegistration.css';

const AdvocateRegistration = () => {
  const [formData, setFormData] = useState({
    username: '',
    region: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    aadhar: '',
    barCouncilNumber: '',
    casePreferences: '',
    description: '',
    profilePicture: null
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const districts = [
    "Ariyalur", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul",
    "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri",
    "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur",
    "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi",
    "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli",
    "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur",
    "Vellore", "Viluppuram", "Virudhunagar"
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Create JSON object
    const registrationData = {
      timestamp: new Date().toISOString(),
      ...formData
    };

    // Convert to JSON string
    const jsonString = JSON.stringify(registrationData, null, 2);
    
    // Create a blob and download the JSON file
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `advocate_registration_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Log to console
    console.log('Registration Data:', registrationData);
    
    // Show success message
    alert('Registration submitted successfully! JSON file downloaded.');
    
    // Optionally reset form
    // resetForm();
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
      barCouncilNumber: '',
      casePreferences: '',
      description: '',
      profilePicture: null
    });
  };

  return (
    <div className="app-container">
      <center>
        <h1 id="title">Advocate Sign Up</h1>
      </center>
      
      <div className="register" id="box">
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
            {districts.map((district, index) => (
              <option key={index} value={district}>{district}</option>
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
            type="tel"
            className="input-box"
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
            type="text"
            className="input-box"
            name="aadhar"
            value={formData.aadhar}
            onChange={handleInputChange}
            placeholder="Enter your Aadhar Number"
            required
          />

          <p className="input-title">Bar Council Number</p>
          <input
            type="text"
            className="input-box"
            name="barCouncilNumber"
            value={formData.barCouncilNumber}
            onChange={handleInputChange}
            placeholder="Enter your Bar Council Number"
            required
          />

          <p className="input-title">Case Preferences</p>
          <input
            type="text"
            className="input-box"
            name="casePreferences"
            value={formData.casePreferences}
            onChange={handleInputChange}
            placeholder="Preferred Cases"
            required
          />

          <p className="input-title">Description</p>
          <input
            type="text"
            className="input-box"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
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

export default AdvocateRegistration;
