import { useState } from 'react';
import NewRecipe from './NewRecipe';

export default function AddRecipeForm() {
    const [formData, setFormData] = useState({
        title: '',
        ingredients: '',
        instructions: '',
        picture: null, // For file upload
        link: '',
    });

    const BASE_API_URL = 'http://localhost:3000/recipes';
    const HEADERS_API = {
        //'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    };

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

            console.log("formData: ");
            console.log(formData);

            console.log("formDataWithFile: ");
            console.log(formDataWithFile);

            const options = {
                method: 'POST',
                headers: HEADERS_API,
                body: formDataWithFile
            }

            const response = await fetch(BASE_API_URL, options);

            //console.log(req);

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
            });

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
        <form method='post' onSubmit={handleSubmit} encType='multipart/form-data'>
            <label htmlFor="title">Title:</label>
            <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
            />

            <label htmlFor="ingredients">Ingredients:</label>
            <textarea
                id="ingredients"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
            />

            <label htmlFor="instructions">Instructions:</label>
            <textarea
                id="instructions"
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
            />

            <label htmlFor="picture">Upload Picture:</label>
            <input
                type="file"
                accept="image/*, .png"
                id="picture"
                name="picture"
                onChange={handleChange}
            />

            <label htmlFor="link">YouTube or Website Link:</label>
            <input
                type="text"
                id="link"
                name="link"
                value={formData.link}
                onChange={handleChange}
            />

            <button type="submit">Save Recipe</button>
        </form>
    );
}
