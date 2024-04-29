import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>day 01</h1>
      <h1>Welcome to My Website</h1>
      <div>
        <Link to="/signup" style={buttonStyle}>Sign Up</Link>
        <Link to="/signin" style={{ ...buttonStyle, marginLeft: '10px' }}>Sign In</Link>
      </div>
    </div>
  );
}

const buttonStyle = {
  display: 'inline-block',
  padding: '10px 20px',
  borderRadius: '5px',
  textDecoration: 'none',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '16px',
  backgroundColor: '#007bff', // Blue
  border: 'none',
};

export default Home;
