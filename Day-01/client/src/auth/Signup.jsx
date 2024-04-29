import React, { useState } from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import '../styles/Signup.css'; 
import { Toaster, toast } from 'sonner';

const Signup = () => {
  // State variables for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/register', { name, email, password }) // corrected axios usage
      .then(result => {console.log(result)
        toast.success('user registerd Successfully !', { autoClose: 2000 });
        setTimeout(() => {
          navigate('/Signin');
        }, 2000);       })
      .catch(err => {
        if (err.response.status === 400) {
          toast.error('Email already in DataBase.', { autoClose: 2000 });
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
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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

export default Signup;
