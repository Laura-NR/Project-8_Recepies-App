import { useState, useEffect } from "react";
import Authenticate from "./components/Authenticate";
import RecipesApp from "./RecipesApp";
import Register from "./components/Register";


export default function App() {
    const [authenticated, setAuthenticated] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            setAuthenticated(true);
        }
    }, []);

    const onAuthenticatedChangedHandler = (newAuthValue, token) => {
        if (newAuthValue) {
            localStorage.setItem('jwt', token); // Save the token when logging in
        } else {
            localStorage.removeItem('jwt'); // Remove the token when logging out
        }
        setAuthenticated(newAuthValue);
    };

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        setAuthenticated(false);
    };

    // Handler to switch to the registration form
    const switchToRegister = () => setShowRegister(true);
    const switchToLogin = () => setShowRegister(false);

    // Handler for successful registration
    const onRegistrationSuccess = () => {
        setShowRegister(false); // Go back to the login form
        alert("Registration successful. Please login.");
    };

    if (authenticated) {
        return <RecipesApp onLogout={handleLogout} />;
    } else {
        return (
            <>
                {showRegister ? (
                    <Register onRegistrationSuccess={onRegistrationSuccess} switchToLogin={switchToLogin} />
                ) : (
                    <>
                        <Authenticate onAuthenticatedChanged={onAuthenticatedChangedHandler} switchToRegister={switchToRegister} />
                    </>
                )}
            </>
        );
    }
}