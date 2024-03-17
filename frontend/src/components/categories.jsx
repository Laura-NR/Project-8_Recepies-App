import React, { useState } from 'react';

export default function Categories() {
    const [categoryName, setCategoryName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Assuming your backend endpoint for adding a category is '/categories'
        const url = 'http://localhost:3000/categories';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: categoryName }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Category added:', data);
                // Reset the form or provide user feedback
                setCategoryName('');
                // Optionally, refresh the list of categories if displayed elsewhere
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
