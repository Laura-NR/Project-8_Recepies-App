import React, { useState, useEffect } from 'react';
import '../CategoriesDisplay.css';
import { updateCategory, deleteCategory } from '../API/category-manager';

function CategoriesDisplay({ categories, onCategoriesChanged }) {
    const onEditCategory = async (category) => {
        const newName = prompt("Enter new name for the category:", category.name);
        if (newName && newName !== category.name) {
            try {
                await updateCategory(category.id, newName);
                onCategoriesChanged(); // Refresh categories list
            } catch (error) {
                console.error('Error updating category:', error);
            }
        }
    };

    const onDeleteCategory = async (categoryId) => {
            try {
                await deleteCategory(categoryId);
                onCategoriesChanged(); // Refresh categories list
            } catch (error) {
                console.error('Error deleting category:', error);
            }
    };

    return (
        <div className="categories-display container mt-3">
            <div className="d-flex flex-wrap">
                {categories.map((category) => (
                    <div key={`${category.id}-${category.name}`} className="category-container p-2">
                        <div className="category-content">
                            {category.name}
                            <div className="category-actions">
                                <button onClick={() => onEditCategory(category)} type="button" style={{background: 'none', padding: '0'}}>✏️</button>
                                <button onClick={() => onDeleteCategory(category.id)} type="button" style={{background: 'none', padding: '0'}}>🗑️</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoriesDisplay;
