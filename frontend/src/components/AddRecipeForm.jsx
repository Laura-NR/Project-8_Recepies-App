import { useState, useEffect } from 'react';
import NewRecipe from './NewRecipe';
import '../AddRecipeForm.css';
import { fetchCategories } from '../API/category-manager';
import { createRecipe } from '../API/recipe-manager';

export default function AddRecipeForm({ setShowForm, fetchRecipes, onRecipesUpdated, refreshRecipeCount }) {
    const [formData, setFormData] = useState({
        title: '',
        ingredients: '',
        instructions: '',
        picture: null, // For file upload
        link: '',
        categoryId: '',
    });
    const [categories, setCategories] = useState([]);;

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const categoriesData = await fetchCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error('Failed to load categories:', error);
            }
        };

        loadCategories();
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();

        const jwtToken = localStorage.getItem('jwt');
        // Assuming createRecipe returns the newly created recipe on success
        try {
            const newRecipe = await createRecipe(formData, jwtToken);
            if (newRecipe) {
                await onRecipesUpdated(); // Call the passed callback to refresh the recipes 
                await refreshRecipeCount();
                setShowForm(false);
            }
            // Assuming fetchRecipes is a function that sets state with updated recipes
            /*fetchRecipes(jwtToken).then(() => {
                // Now that state is updated with the new recipe, no need to refresh
                // Close the modal or indicate success to the user
                setShowForm(false);
            });*/
        } catch (error) {
            console.error('Error creating recipe:', error);
            // Handle the error, maybe notify the user
        }
    };

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (files) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: files[0],
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
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

                    <button type="submit" className='btn btn-success mt-4'>Save Recipe</button>
                </form>
            </div>
        </div>
    );
}
