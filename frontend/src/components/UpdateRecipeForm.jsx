import React, { useState, useEffect } from 'react';
import { updateRecipe } from '../API/recipe-manager';
import { fetchCategories } from '../API/category-manager';

export default function UpdateRecipeForm({ setShowUpdateForm, editingRecipe, onRecipesUpdated, fetchRecipes }) {
    const [formData, setFormData] = useState(editingRecipe || {});
    const [categories, setCategories] = useState([]);

    console.log('Recipe to be updated: ', formData);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const categoriesData = await fetchCategories();
                setCategories(categoriesData); // Set categories state
            } catch (error) {
                console.error('Failed to load categories:', error);
            }
        };

        loadCategories();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const jwtToken = localStorage.getItem('jwt');
        try {
            const updatedRecipe = await updateRecipe(formData, editingRecipe.id, jwtToken);
            if (updatedRecipe) {
                await onRecipesUpdated();
                setShowUpdateForm(false);
            }
        } catch (error) {
            console.error('Error updating recipe:', error);
        }
    };

    // Handle change function to update formData state

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        const updatedValue = files ? files[0] : value;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: updatedValue,
        }));
    };


    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <form method='post' onSubmit={handleSubmit} encType='multipart/form-data'>
                    <label htmlFor="title" className='form-label text-light'>Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className='form-control'
                        value={formData.title}
                        onChange={handleChange}
                    />

                    <label htmlFor="ingredients" className='form-label text-light'>Ingredients:</label>
                    <textarea
                        id="ingredients"
                        name="ingredients"
                        className='form-control'
                        value={formData.ingredients}
                        onChange={handleChange}
                    />

                    <label htmlFor="instructions" className='form-label text-light'>Instructions:</label>
                    <textarea
                        id="instructions"
                        name="instructions"
                        className='form-control'
                        value={formData.instructions}
                        onChange={handleChange}
                    />

                    <label htmlFor="picture" className='form-label text-light'>Upload Picture:</label>
                    <input
                        type="file"
                        accept="image/*, .png"
                        id="picture"
                        name="picture"
                        className='form-control'
                        onChange={handleChange}
                    />

                    <div className="mb-3"> {/* Bootstrap form group */}
                        <label htmlFor="categoryId" className="form-label text-light">Category:</label>
                        <select className="form-select" name="categoryId" value={formData.categoryId} onChange={handleChange}>
                            <option value="">Select a category</option> {/* Default option */}
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <label htmlFor="link" className='form-label text-light'>YouTube or Website Link:</label>
                    <input
                        type="text"
                        id="link"
                        name="link"
                        className='form-control'
                        value={formData.link}
                        onChange={handleChange}
                    />

                    <button type="submit" className='btn btn-success mt-4'>Update Recipe</button>
                </form>
            </div>
        </div>
    );
}