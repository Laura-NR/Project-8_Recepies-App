import React, { useState } from 'react';
import { registerUser } from '../API/user-manager';

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
            const data = await registerUser(formData);
            alert(data.message);
            onRegistrationSuccess();
        } catch (error) {
            alert(error.message);
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
