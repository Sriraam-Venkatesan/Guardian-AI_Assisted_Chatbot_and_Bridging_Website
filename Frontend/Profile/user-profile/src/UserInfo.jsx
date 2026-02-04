import { useEffect, useState } from 'react';
import Profile from './profile';

const getCookie = (name) => {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, '');
};

function UserInfo() {
  console.log("UserInfo Component Mounting...");
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("UserInfo useEffect triggered");

    const userStr = getCookie('guardianUser') || localStorage.getItem('guardianUser');
    if (userStr) {
      const userData = JSON.parse(userStr);
      setLoading(true);
      fetch(`http://localhost:8000/auth/profile/${userData.id}`)
        .then(res => {
          if (!res.ok) throw new Error("Failed to fetch profile");
          return res.json();
        })
        .then(data => {
          setDetails([{
            id: data.id,
            name: data.name,
            role: data.role || 'User',
            image: './default_pfp.png',
            area: data.area || 'N/A',
            aadhar: data.aadhar || 'N/A',
            description: `Guardian User from ${data.area || 'Unknown'}`,
            case: data.cost_preferences || 'N/A'
          }]);
          setLoading(false);
        })
        .catch(err => {
          console.error("Profile Fetch Error:", err);
          setError(err.message === "Failed to fetch" ? "Cannot connect to Backend Server. Please make sure it is running on port 8000." : err.message);
          setLoading(false);
        });
    } else {
      setError("Session not found. Please log in again.");
    }
  }, []);

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'home-font', color: '#8f6703' }}>
      <h2>Loading Profile...</h2>
    </div>
  );

  if (error) return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'home-font', color: '#8b0000', padding: '20px', textAlign: 'center' }}>
      <h2>Error Loading Profile</h2>
      <p style={{ marginTop: '10px', fontSize: '18px' }}>{error}</p>
      <button onClick={() => window.location.href = 'http://localhost:8000/frontend/Home/HomePage copy.html'} style={{ marginTop: '20px', padding: '10px 20px', background: '#8f6703', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Return to Home</button>
    </div>
  );

  if (!getCookie('guardianUser') && !localStorage.getItem('guardianUser')) return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'home-font', color: '#8f6703', textAlign: 'center' }}>
      <h2>Please Sign In</h2>
      <p style={{ marginTop: '10px' }}>You must be logged in to view your profile.</p>
      <button onClick={() => window.location.href = 'http://localhost:5173'} style={{ marginTop: '20px', padding: '10px 20px', background: '#8f6703', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Go to Sign In</button>
    </div>
  );

  if (details.length === 0 && !loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'home-font', color: '#8f6703' }}>
      <h2>No Profile Details Found in Database</h2>
    </div>
  );



  return (
    <>
      {details.map(info => (
        <Profile
          key={info.id}
          name={info.name}
          image={info.image}
          role={info.role}
          description={info.description}
          case={info.case}
        />
      ))}
    </>
  );
}

export default UserInfo;
