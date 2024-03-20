import React from 'react';

export default function LogoutButton({ onLogout }) {
    return (
        <button onClick={onLogout} className="btn btn-danger">Logout</button>
    );
}


