import React, { useState, useEffect } from 'react';
import './App.css';
import AddRecipeForm from './components/AddRecipeForm';
import UpdateRecipeForm from './components/UpdateRecipeForm';
import Recipes from './components/recipes';
import TopBar from './components/TopBar';
import CategoriesDisplay from './components/CategoriesDisplay';
import { fetchRecipes, deleteRecipe as deleteRecipeAPI } from './API/recipe-manager';
import { fetchCategories } from './API/category-manager';
import RecipeCounter from './components/RecipeCounter';

export default function RecipesApp({ onLogout }) {
  const [showForm, setShowForm] = useState(false);
  const [recipes, setRecipes] = useState([]); // State to hold recipes data
  const [searchTerm, setSearchTerm] = useState('');
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isSortedAsc, setIsSortedAsc] = useState(true); // true for ascending, false for descending

  useEffect(() => {
    const initCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error initializing categories:', error);
      }
    };
    initCategories();
  }, []);


  const handleCategoryAdded = (newCategory) => {
    setCategories(currentCategories => [...currentCategories, newCategory]);
  };

  const onCategoriesChanged = async () => {
    try {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error refreshing categories:', error);
    }
  };

  useEffect(() => {
    const init = async () => {
      const jwt = localStorage.getItem('jwt');
      try {
        const recipesData = await fetchRecipes(jwt);
        console.log('Fetched recipes:', recipesData); // Debugging line
        setRecipes(recipesData);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
    init();
  }, []);

  const refreshRecipes = async () => {
    const jwtToken = localStorage.getItem('jwt');
    const updatedRecipes = await fetchRecipes(jwtToken); // Assuming this fetches the updated list correctly
    setRecipes(updatedRecipes);
  };

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm.toLowerCase());
  };

  const filteredRecipes = recipes.filter(recipe =>
  (recipe.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.description?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleSortOrder = () => {
    setIsSortedAsc(!isSortedAsc);
  };

  const sortedFilteredRecipes = filteredRecipes.sort((a, b) => {
    return isSortedAsc ? a.id - b.id : b.id - a.id;
  });

  // Method to delete a recipe
  const deleteRecipe = async (id) => {
    const jwtToken = localStorage.getItem('jwt'); // Retrieve the JWT token from local storage
    const success = await deleteRecipeAPI(id, jwtToken);
    if (success) {
      // Update the local state to remove the deleted recipe if delete was successful
      setRecipes((currentRecipes) => currentRecipes.filter((recipe) => recipe.id !== id));
    } else {
      console.error('Failed to delete recipe');
    }
  };


  return (
    <>
      <div>
        <TopBar setShowForm={setShowForm} onSearchChange={handleSearchChange} onCategoryAdded={handleCategoryAdded} onLogout={onLogout} />
        {showForm && !editingRecipe && <AddRecipeForm setShowForm={setShowForm} fetchRecipes={fetchRecipes} onRecipesUpdated={refreshRecipes} />}
        {editingRecipe && <UpdateRecipeForm setShowForm={setShowForm} fetchRecipes={fetchRecipes} editingRecipe={editingRecipe} setEditingRecipe={setEditingRecipe} onRecipesUpdated={refreshRecipes} />}
      </div>
      <div className="categories-display container mb-4" style={{ marginLeft: '20%', marginTop: '60px' }}>
        <CategoriesDisplay categories={categories} onCategoriesChanged={onCategoriesChanged} />
      </div>
      <div style={{ marginLeft: '20%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={toggleSortOrder} className="btn btn-primary mb-3">&#8645;</button>
        <RecipeCounter />
      </div>
      <div className="recipes-grid">
        <Recipes recipes={sortedFilteredRecipes} onDelete={deleteRecipe} setEditingRecipe={setEditingRecipe} setShowForm={setShowForm} />
      </div>
    </>
  );
}
