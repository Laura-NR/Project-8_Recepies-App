import React, { useState, useEffect } from 'react';

export default function RecipeCounter ({ recipeCount }) {
   
    return(
        <p>You have saved <span style={{fontSize: '26px', padding: '0 5px', color: 'red'}}>{recipeCount}</span> recipes.</p>
    );
}