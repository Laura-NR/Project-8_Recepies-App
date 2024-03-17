import React, { useState, useEffect } from 'react';
import './App.css';
import AddRecipeForm from './components/AddRecipeForm';
import Recipes from './components/recipes';
import TopBar from './components/TopBar';

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [recipes, setRecipes] = useState([]); // State to hold recipes data
  const [searchTerm, setSearchTerm] = useState('');
  const [editingRecipe, setEditingRecipe] = useState(null);

  // Fetch recipes data when the component mounts
  const fetchRecipes = async () => {
    const response = await fetch('http://localhost:3000/recipes'); // Adjust the URL as needed
    const data = await response.json();
    setRecipes(data);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm.toLowerCase());
  };
  
  const filteredRecipes = recipes.filter(recipe => 
    (recipe.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.description?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Method to delete a recipe
  const deleteRecipe = async (id) => {
    try {
        await fetch(`http://localhost:3000/recipes/${id}`, { method: 'DELETE' });
        // Update the local state to remove the deleted recipe
        setRecipes(recipes.filter(recipe => recipe.id !== id));
    } catch (error) {
        console.error('Failed to delete recipe:', error);
    }
  };

  return (
    <>
      <div>
        <TopBar setShowForm={setShowForm} onSearchChange={handleSearchChange} />
        {showForm || editingRecipe ? <AddRecipeForm setShowForm={setShowForm} fetchRecipes={fetchRecipes} editingRecipe={editingRecipe} setEditingRecipe={setEditingRecipe} /> : null}
      </div>
      <div className="recipes-grid">
        <Recipes recipes={filteredRecipes} onDelete={deleteRecipe} setEditingRecipe={setEditingRecipe} />
      </div>
    </>
  );
}
