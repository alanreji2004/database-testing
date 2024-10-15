import React, { useState } from 'react';
import styles from "./Signup.module.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const registerUser = async () => {
    try {
    const response = await axios.post('http://localhost:8082/signup', userData);

      if (response.data.message === "User registered successfully") {
        const user = response.data.user; 
        console.log("User data to store:", user); 
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/'); 
    } else {
        setErrorMessage(response.data.message || 'Signup failed. Please try again.');
    }
    
    } catch (error) {
      console.error('Signup error:', error);
      setErrorMessage('An error occurred while signing up. Please try again.');
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.formContainer}>
        <input
          type="text"
          required
          placeholder="Enter Your Name"
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          className={styles.userFullNameInput}
        />
        <input
          type="email"
          required
          placeholder="Enter Your Email Address"
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          className={styles.userEmailInput}
        />
        <input
          type="password"
          required
          placeholder="Enter Your Password"
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          className={styles.userPasswordInput}
        />
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <button className={styles.submitButton} onClick={registerUser}>Signup</button>
      </div> 
    </div>
  );
};

export default Signup;
