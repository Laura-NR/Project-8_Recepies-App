import React, { useState, useEffect } from 'react';
import SingleRecipe from './SingleRecipe'; // Import the new component
import '../recipes.css';

export default function Recipes({ recipe }) {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null); // State to track the selected recipe

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:3000/recipes');
            const data = await response.json();
            console.log("Fetched data:", data);
            setRecipes(data);
        }
        fetchData();
    }, []);


    return (
        <>
            <div className="recipes-container">
                {recipes.length > 0 ? (
                    recipes.map(recipe => {
                        // Move the construction of imageUrl inside the map function
                        const imageUrl = `http://localhost:3000${recipe?.image}`;
                        return (
                            <div className="card" key={recipe.id} onClick={() => setSelectedRecipe(recipe)}>
                                <img src={imageUrl} alt={recipe.title} />
                                <div className="card-body">
                                    <h5 className="card-title">{recipe.title}</h5>
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
