import React, { useEffect, useState } from 'react';
import styles from './Profile.module.css';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userRecipes, setUserRecipes] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      fetchUserRecipes(storedUser.id); 
    }
  }, []);

  const fetchUserRecipes = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8082/recipes?userId=${userId}`);
      setUserRecipes(response.data);
    } catch (error) {
      console.error('Error fetching user recipes:', error);
    }
  };

  if (!user) {
    return <p>Loading user data...</p>; 
  }

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.greeting}>Hi, {user.name}!</h1>

      <h2>Your Recipes:</h2>
      {userRecipes.length === 0 ? (
        <p>You have not added any recipes yet.</p>
      ) : (
        <ul className={styles.recipeList}>
          {userRecipes.map((recipe) => (
            <li key={recipe.id} className={styles.recipeItem}>
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;
