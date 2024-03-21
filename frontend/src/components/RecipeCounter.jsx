import React, { useState, useEffect } from 'react';
import { fetchRecipeCountForUser } from '../API/recipe-manager';

export default function RecipeCounter () {
    const [recipeCount, setRecipeCount] = useState(0);

    useEffect(() => {
        const getCount = async () => {
            const count = await fetchRecipeCountForUser();
            setRecipeCount(count);
        };

        getCount();
    }, []);

    return(
        <p>You have saved <span style={{fontSize: '26px', padding: '0 5px', color: 'red'}}>{recipeCount}</span> recipes.</p>
    );
}