import React, { useState } from 'react';
import { updateCategory } from '../API/category-manager';
import '../EditCategoryForm.css'

export default function EditCategoryForm({ category, onClose, onCategoriesChanged }) {
  const [categoryName, setCategoryName] = useState(category.name);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCategory(category.id, categoryName);
      onCategoriesChanged();
      onClose(); // Close modal
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit} className="p-3">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary me-2">Update</button>
            <button type="button" className="btn btn-danger" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );  
  
}
