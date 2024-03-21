import React, { useState, useEffect } from 'react';
import '../CategoriesDisplay.css';
import { updateCategory, deleteCategory } from '../API/category-manager';

function CategoriesDisplay({ categories, onCategoriesChanged, startEditingCategory, handleCategoryFilterChange }) {

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
                <div className="category-container p-2" onClick={() => handleCategoryFilterChange('All')}>
                    <div className="category-content">All Categories</div>
                </div>
                {categories.map((category) => (
                    <div key={`${category.id}-${category.name}`} className="category-container p-2" onClick={() => handleCategoryFilterChange(category.id)}>
                        <div className="category-content">
                            {category.name}
                            <div className="category-actions" onClick={(e) => e.stopPropagation()}>
                                <button onClick={() => startEditingCategory(category)} type="button" style={{ background: 'none', padding: '0' }}>✏️</button>
                                <button onClick={() => onDeleteCategory(category.id)} type="button" style={{ background: 'none', padding: '0' }}>🗑️</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoriesDisplay;
