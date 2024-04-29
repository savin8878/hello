import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';

const Singin = () => {
  // State variables for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/login', { email, password })
      .then(result => {
        console.log(result)
        if (result.status === 200) {
          toast.success('Login Successful!', { autoClose: 2000 });
          setTimeout(() => {
            navigate('/');
          }, 2000); 
        } else {
          toast.error('Login Failed! Please check your credentials.', { autoClose: 2000 });
        }
      })
      .catch(err => {
        if (err.response.status === 401) {
          toast.error('Incorrect password.', { autoClose: 2000 });
        } else if (err.response.status === 500) {
          toast.error('Internal Server Error. Please try again later.', { autoClose: 2000 });
        } else {
          toast.error('An error occurred. Please try again later.', { autoClose: 2000 });
        }
  });
  };

  return (
    <div className="signup-container">
      <Toaster  richColors/>
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Sign In</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Singin;
