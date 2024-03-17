import React, { useState, useEffect } from 'react';
import './App.css';
import AddRecipeForm from './components/AddRecipeForm';
import Recipes from './components/recipes';
import TopBar from './components/TopBar';

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [recipes, setRecipes] = useState([]); // State to hold recipes data
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch recipes data when the component mounts
    const fetchRecipes = async () => {
      const response = await fetch('http://localhost:3000/recipes'); // Adjust the URL as needed
      const data = await response.json();
      setRecipes(data);
    };

    fetchRecipes();
  }, []);

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm.toLowerCase());
  };
  
  const filteredRecipes = recipes.filter(recipe => 
    (recipe.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.description?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <div>
        <TopBar setShowForm={setShowForm} onSearchChange={handleSearchChange} />
        {showForm && <AddRecipeForm setShowForm={setShowForm} />}
      </div>
      <div className="recipes-grid">
        <Recipes recipes={filteredRecipes} />
      </div>
    </>
  );
}
