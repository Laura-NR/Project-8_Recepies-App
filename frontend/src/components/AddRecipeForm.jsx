import { useState, useEffect } from 'react';
import NewRecipe from './NewRecipe';
import '../AddRecipeForm.css';

export default function AddRecipeForm({ setShowForm, fetchRecipes, editingRecipe, setEditingRecipe }) {
    const [formData, setFormData] = useState({
        title: '',
        ingredients: '',
        instructions: '',
        picture: null, // For file upload
        link: '',
        categoryId: '',
    });
    const [categories, setCategories] = useState([]);

    const BASE_API_URL = editingRecipe ? `http://localhost:3000/recipes/${editingRecipe.id}` : 'http://localhost:3000/recipes';

    useEffect(() => {
        // If editingRecipe is not null, pre-populate the form
        if (editingRecipe) {
            setFormData({
                title: editingRecipe.title,
                ingredients: editingRecipe.ingredients,
                instructions: editingRecipe.instructions,
                picture: editingRecipe.image,
                link: editingRecipe.link,
                categoryId: editingRecipe.category
            });
        }
    }, [editingRecipe]);

    useEffect(() => {
        // Function to fetch categories
        const fetchCategories = async () => {
            const jwtToken = localStorage.getItem('jwt'); // Assuming the JWT token is stored in local storage with the key 'jwt'
            const response = await fetch('http://localhost:3000/categories', {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            console.log('Categories: ', data);
            setCategories(data);
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {

            const formDataWithFile = new FormData();
            formDataWithFile.append('title', formData.title);
            formDataWithFile.append('ingredients', formData.ingredients);
            formDataWithFile.append('instructions', formData.instructions);
            if (formData.picture) {
                formDataWithFile.append('picture', formData.picture); // Append file data if it exists
            }
            formDataWithFile.append('link', formData.link);
            formDataWithFile.append('category', formData.categoryId);

            const jwtToken = localStorage.getItem('jwt');

            console.log("formData: ");
            console.log(formData);

            console.log("formDataWithFile: ");
            console.log(formDataWithFile);

            const options = {
                method: editingRecipe ? 'PUT' : 'POST',
                body: formDataWithFile,
                headers: {
                    'Authorization': `Bearer ${jwtToken}` // Include the JWT token in the Authorization header
                }
            }

            const response = await fetch(BASE_API_URL, options);

            // On success:
            fetchRecipes(); // Refresh the recipes list
            setEditingRecipe(null); // Reset editing state

            if (!response.ok) {
                throw new Error('Failed to add recipe');
            }

            // Reset form after successful submission
            setFormData({
                title: '',
                ingredients: '',
                instructions: '',
                picture: null,
                link: '',
                categoryId: '',
            });

            // Close the modal
            setShowForm(false);

        } catch (error) {
            console.error('Error adding recipe:', error.message);
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
