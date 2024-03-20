import React, { useState } from 'react';

export default function Register({ onRegistrationSuccess, switchToLogin }) {
    const [formData, setFormData] = useState({
        name: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                onRegistrationSuccess();
            } else {
                const error = await response.json();
                alert(error.message);
            }
        } catch (error) {
            console.error('Failed to register:', error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minWidth: "100vw" }}>
            <form onSubmit={handleSubmit} className="needs-validation" noValidate style={{ maxWidth: "400px", width: "100%" }}>
                <fieldset>
                    <legend>Register</legend>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Username</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <div className="invalid-feedback">
                            Please choose a username.
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <div className="invalid-feedback">
                            Please enter a password.
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </fieldset>
                <div className="text-center mt-3">
                    <button onClick={switchToLogin} className="btn btn-success">Back to Login</button>
                </div>
            </form>
        </div>
    );
}
