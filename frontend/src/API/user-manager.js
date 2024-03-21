export const registerUser = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to register');
        }

        return await response.json(); // Return the response data
    } catch (error) {
        console.error('Registration error:', error);
        throw error; // Re-throw the error so it can be caught in the component
    }
};

export const loginUser = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Authentication failed');
        }

        return await response.json(); // Return the response data including JWT
    } catch (error) {
        console.error('Login error:', error);
        throw error; // Re-throw the error so it can be caught in the component
    }
};
