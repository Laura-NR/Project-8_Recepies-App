//Method to retrieve the recipes
export const fetchRecipes = async (token, categoryId = '') => {
    try {
        let url = `${import.meta.env.VITE_BACKEND_URL}/recipes`;
        if (categoryId !== '' && categoryId !== 'All') {
            url += `?category=${categoryId}`; // Assuming your backend supports this query parameter
        }
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch recipes');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return []; // Return an empty array in case of any error
    }
};


//Create a new recipe
export const createRecipe = async (formData, token) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/recipes`;

    return await sendRecipeData('POST', url, formData, token);
};

//Update an existing recipe 
export const updateRecipe = async (formData, recipeId, token) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/recipes/${recipeId}`;

    return await sendRecipeData('PUT', url, formData, token);
};

const sendRecipeData = async (method, url, formData, token) => {
    const formDataWithFile = new FormData();
    formDataWithFile.append('title', formData.title);
    formDataWithFile.append('ingredients', formData.ingredients);
    formDataWithFile.append('instructions', formData.instructions);
    if (formData.picture) {
        formDataWithFile.append('picture', formData.picture);
    }
    formDataWithFile.append('link', formData.link);
    formDataWithFile.append('category', formData.categoryId);

    try {
        const response = await fetch(url, {
            method,
            body: formDataWithFile,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to save recipe');
        }

        return await response.json();
    } catch (error) {
        console.error(`Error ${method === 'POST' ? 'creating' : 'updating'} recipe:`, error);
        throw error;
    }
};

//Method to delete a recipe
export const deleteRecipe = async (id, token) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/recipes/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to delete recipe');
        }
        return true; // Indicate success
    } catch (error) {
        console.error('Error deleting recipe:', error);
        return false; // Indicate failure
    }
};

//Function to count the number of recipes per user
export const fetchRecipeCountForUser = async () => {
    const jwtToken = localStorage.getItem('jwt');
    if (!jwtToken) return 0; // Return 0 if no jwtToken is found

    try {
        const recipes = await fetchRecipes(jwtToken); // Use the existing fetchRecipes function
        return recipes.length; // Return the count of recipes
    } catch (error) {
        console.error('Error fetching recipe count:', error);
        return 0; // Return 0 as a fallback in case of an error
    }
};
