import React, { useState, useEffect } from 'react';
import SingleRecipe from './SingleRecipe'; // Import the new component
import '../recipes.css';

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null); // State to track the selected recipe

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:3000/recipes');
            const data = await response.json();
            setRecipes(data);
        }
        fetchData();
    }, []);

    return (
        <>
            <div className="recipes-container">
                {recipes.map(recipe => (
                    <div className="card" key={recipe.id} onClick={() => setSelectedRecipe(recipe)}>
                        <img src={recipe.image} className="card-img-top" alt={recipe.title} />
                        <div className="card-body">
                            <h5 className="card-title">{recipe.title}</h5>
                        </div>
                    </div>
                ))}
            </div>
            {selectedRecipe && <SingleRecipe recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />}
        </>
    );
}
