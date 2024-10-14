import React, { useState } from 'react';
import styles from "./Signup.module.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Signup = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password:"",
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSignup = async () => {
    console.log("User data:", userData);
    try {
      const response = await axios.post('http://localhost:8082/signup', userData);
      navigate('/');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Signup failed. Please try again.");
    }
  };


  return (
    <div className={styles.mainContainer}>
      <div className={styles.formContainer}>
        <input
          type="text"
          required
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          placeholder="Enter Your Full Name"
          className={styles.userFullNameInput}
        />

        <input
          type="email"
          required
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          placeholder="Enter Your Email Address"
          className={styles.userEmailInput}
        />

        <input
          type="password"
          required
          value={userData.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          placeholder="Enter Your Password"
          className={styles.userPasswordInput}
        />

        <button className={styles.submitButton} onClick={handleSignup}>
          Signup
        </button>

        <Link to="/login">
          <p className={styles.link}>Already have an account? Login now!</p>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
