export const fetchCategories = async () => {
    const jwtToken = localStorage.getItem('jwt'); // Assuming the JWT token is stored in local storage
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
        throw error; // Rethrow the error to be handled by the caller
    }
};
