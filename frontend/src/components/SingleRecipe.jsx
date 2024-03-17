import React from 'react';
import '../singleRecipe.css'; // Assume you have CSS for styling the modal

function SingleRecipe({ recipe, onClose }) {
    return (
        <div className="modal-overlay-recipe" onClick={onClose}>
            <div className="modal-content-recipe" onClick={e => e.stopPropagation()}> {/* Prevents click inside the modal from closing it */}
                <div className="recipe-container"> {/* This container can be styled further if needed */}
                    <img src={recipe.image} alt={recipe.title} className="img-fluid" />
                    <h2>{recipe.title}</h2>
                    <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                    <p><strong>Instructions:</strong> {recipe.instructions}</p>
                    {recipe.link && <a href={recipe.link} target="_blank" rel="noopener noreferrer">View Tutorial</a>}
                </div>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}


export default SingleRecipe;
