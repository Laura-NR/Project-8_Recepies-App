import React, { useState } from 'react';

export default function Categories({ onCategoryAdded }) {
    const [categoryName, setCategoryName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const url = 'http://localhost:3000/categories';
        const jwtToken = localStorage.getItem('jwt'); // Retrieve the JWT token from local storage
    
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}` // Include the JWT token in the Authorization header
                },
                body: JSON.stringify({ name: categoryName }),
            });
    
            if (response.ok) {
                const newCategory = await response.json();
                console.log('Category added:', newCategory);
                onCategoryAdded(newCategory);
                // Reset the form or provide user feedback
                setCategoryName('');
                // Optionally, refresh categories list to include the new category
            } else {
                // Handle server errors or invalid responses
                console.error('Failed to add category');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    

    return (
        <form className="d-flex justify-content-end" onSubmit={handleSubmit}>
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    id="categoryName"
                    placeholder="Category Name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                />
                <button type="submit" className="btn btn-primary">Add Category</button>
            </div>
        </form>
    );
}
