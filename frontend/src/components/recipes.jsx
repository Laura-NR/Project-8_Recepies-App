import React from 'react';
import { useState } from 'react';
import SingleRecipe from './SingleRecipe'; // Import the new component
import '../recipes.css';

// Now Recipes accepts a `recipes` prop instead of fetching data itself
export default function Recipes({ recipes, onDelete, setEditingRecipe, setShowUpdateForm }) {
    const [selectedRecipe, setSelectedRecipe] = useState(null); // State to track the selected recipe

    const handleclick = () => {
        setShowUpdateForm(true);
    };

    return (
        <>
            <div className="recipes-container">
                {recipes.length > 0 ? (
                    recipes.map(recipe => {
                        const imageUrl = `http://localhost:3000${recipe?.image}`;
                        return (
                            <div className="card" key={recipe.id} onClick={() => setSelectedRecipe(recipe)}>
                                <img src={imageUrl} alt={recipe.title} />
                                <div className="card-body">
                                    <h5 className="card-title">{recipe.title}</h5>
                                    <button className='recipes-button' onClick={(e) => {e.stopPropagation(); handleclick(); setEditingRecipe(recipe) }}>✏️</button>
                                    <button className='recipes-button' onClick={(e) => {e.stopPropagation(); onDelete(recipe.id); }}>🗑️</button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>Loading recipes...</p> // Or any other loading indicator
                )}
            </div>
            {selectedRecipe && <SingleRecipe recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />}
        </>
    );
}
