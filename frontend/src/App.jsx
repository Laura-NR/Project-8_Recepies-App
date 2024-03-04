import { useState } from 'react'
import './App.css'
import NewRecipe from './components/NewRecipe'
import AddRecipeForm from './components/AddRecipeForm'

export default function App() {

  return (
    <>
      <NewRecipe />
      <AddRecipeForm />
    </>
  )
}


