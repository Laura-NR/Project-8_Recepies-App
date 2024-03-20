import React, { useState, useEffect } from 'react';
import '../CategoriesDisplay.css';

function CategoriesDisplay({ categories }) {
    console.log(categories);
    return (
        <div className="categories-display container mt-3">
            <div className="d-flex flex-wrap">
                {categories.map((category) => (
                    <div key={`${category.id}-${category.name}`} className="p-2">
                        <button type="button" className="btn btn-outline-primary">
                            {category.name}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoriesDisplay;
