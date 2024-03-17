import React from 'react';
import '../singleRecipe.css'; // Ensure you have CSS for styling the modal

function SingleRecipe({ recipe, onClose }) {
    // Construct the full URL for the image
    const imageUrl = `http://localhost:3000${recipe?.image}`;

    // Split ingredients and instructions into arrays based on line breaks
    const ingredientsList = recipe.ingredients.split('\n');
    const instructionsList = recipe.instructions.split('\n');

    console.log(recipe);

    return (
        <div className="modal-overlay-recipe" onClick={onClose}>
            <div className="modal-content-recipe" onClick={e => e.stopPropagation()}>
                <div className="recipe-top">
                    <div className="recipe-image">
                        <img src={imageUrl} alt={recipe.title} className="img-fluid" />
                    </div>
                    <div className="recipe-details">
                        <h2>{recipe.title}<span className="recipe-category"> - {recipe.categoryName}</span></h2>
                        <strong>Ingredients:</strong>
                        <ul>
                            {ingredientsList.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="recipe-instructions">
                    <strong>Instructions:</strong>
                    <ol>
                        {instructionsList.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                        ))}
                    </ol>
                </div>
                {recipe.link && (
                    <div className="recipe-link">
                        <a href={recipe.link} target="_blank" rel="noopener noreferrer">View Tutorial</a>
                    </div>
                )}
                <div className="close-button">
                    <button onClick={onClose}>Close Recipe</button>
                </div>
            </div>
        </div>
    );
}

export default SingleRecipe;
