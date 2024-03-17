import React, { useState, useEffect } from 'react';
import '../CategoriesDisplay.css';

function CategoriesDisplay() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:3000/categories'); // Adjust the URL as needed
                if (!response.ok) throw new Error('Failed to fetch categories');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="categories-display container mt-3">
            <div className="d-flex flex-wrap">
                {categories.map((category) => (
                    <div key={category.id} className="p-2">
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
