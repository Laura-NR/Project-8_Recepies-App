export const fetchCategories = async () => {
    const jwtToken = localStorage.getItem('jwt'); 
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/categories`, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

// Function to create a category
export const createCategory = async (categoryName) => {
    const jwtToken = localStorage.getItem('jwt');
    const url = `${import.meta.env.VITE_BACKEND_URL}/categories`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`,
            },
            body: JSON.stringify({ name: categoryName }),
        });

        if (!response.ok) {
            throw new Error('Failed to add category');
        }

        return await response.json(); // Return the newly created category
    } catch (error) {
        console.error('Error creating category:', error);
        throw error; 
    }
};

export const updateCategory = async (categoryId, categoryName) => {
    const jwtToken = localStorage.getItem('jwt');
    const url = `${import.meta.env.VITE_BACKEND_URL}/categories/${categoryId}`;

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`,
            },
            body: JSON.stringify({ name: categoryName }),
        });

        if (!response.ok) {
            throw new Error('Failed to update category');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
};

export const deleteCategory = async (categoryId) => {
    const jwtToken = localStorage.getItem('jwt');
    const url = `${import.meta.env.VITE_BACKEND_URL}/categories/${categoryId}`;

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
            },
        });

        if (!response.ok) {
            let message;
            try {
                const data = await response.json();
                message = data.message;
            } catch (jsonError) {
                message = await response.text();
            }
            throw new Error('Failed to delete category: ' + message);
        }
        return await response.json(); 
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
};

