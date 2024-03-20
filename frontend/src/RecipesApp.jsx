import React, { useState, useEffect } from 'react';
import './App.css';
import AddRecipeForm from './components/AddRecipeForm';
import Recipes from './components/recipes';
import TopBar from './components/TopBar';
import CategoriesDisplay from './components/CategoriesDisplay';

export default function RecipesApp({ onLogout }) {
  const [showForm, setShowForm] = useState(false);
  const [recipes, setRecipes] = useState([]); // State to hold recipes data
  const [searchTerm, setSearchTerm] = useState('');
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const jwt = localStorage.getItem('jwt'); // Retrieve the stored token
      try {
        const response = await fetch('http://localhost:3000/categories', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${jwt}`, // Include the token in the Authorization header
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const categories = await response.json();
        setCategories(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryAdded = (newCategory) => {
    setCategories(currentCategories => [...currentCategories, newCategory]);
  };

  // Fetch recipes data when the component mounts
  const fetchRecipes = async () => {
    const jwt = localStorage.getItem('jwt'); // Retrieve the stored token
    try {
      const response = await fetch('http://localhost:3000/recipes', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${jwt}`, // Include the token in the Authorization header
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      const recipes = await response.json();
      setRecipes(recipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
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
    const jwtToken = localStorage.getItem('jwt'); // Retrieve the JWT token from local storage
    const options = {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${jwtToken}` // Include the JWT token in the Authorization header
      }
    };

    try {
      const response = await fetch(`http://localhost:3000/recipes/${id}`, options);
      if (!response.ok) {
        throw new Error('Failed to delete recipe');
      }
      // Update the local state to remove the deleted recipe
      setRecipes(recipes.filter(recipe => recipe.id !== id));
    } catch (error) {
      console.error('Failed to delete recipe:', error);
    }
  };


  return (
    <>
      <div>
        <TopBar setShowForm={setShowForm} onSearchChange={handleSearchChange} onCategoryAdded={handleCategoryAdded} onLogout={onLogout} />
        {showForm || editingRecipe ? <AddRecipeForm setShowForm={setShowForm} fetchRecipes={fetchRecipes} editingRecipe={editingRecipe} setEditingRecipe={setEditingRecipe} /> : null}
      </div>
      <div className="categories-display container mb-4" style={{ marginLeft: '20%', marginTop: '-100px' }}>
        <CategoriesDisplay categories={categories} />
      </div>
      <div className="recipes-grid">
        <Recipes recipes={filteredRecipes} onDelete={deleteRecipe} setEditingRecipe={setEditingRecipe} />
      </div>
    </>
  );
}
