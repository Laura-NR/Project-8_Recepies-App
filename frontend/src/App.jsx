import { useState } from 'react'
import './App.css'
import NewRecipe from './components/NewRecipe'
import AddRecipeForm from './components/AddRecipeForm'
import SearchBar from './components/SearchBar'
import Recipes from './components/recipes'
import Subcategories from './components/subcategories'
import TopBar from './components/TopBar'

export default function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div>
        <TopBar setShowForm={setShowForm} />
        {showForm && <AddRecipeForm setShowForm={setShowForm} />}
      </div>
      <div className="recipes-grid">
        <Recipes />
      </div>
    </>
  );
}


