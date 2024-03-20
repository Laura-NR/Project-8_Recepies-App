//Method to retrieve the recipes
export const fetchRecipes = async (token) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/recipes`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
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

//Method to delete a recipe
export const deleteRecipe = async (id, token) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/recipes/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
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
  
