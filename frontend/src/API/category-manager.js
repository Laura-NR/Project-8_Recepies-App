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
