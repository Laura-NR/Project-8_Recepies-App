import React, { useState } from 'react';
import { createCategory } from '../API/category-manager';

export default function Categories({ onCategoryAdded }) {
    const [categoryName, setCategoryName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const newCategory = await createCategory(categoryName);
            console.log('Category added:', newCategory);
            onCategoryAdded(newCategory);
            setCategoryName('');
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
                <button type="submit" className="btn btn-primary">Add</button>
            </div>
        </form>
    );
}
