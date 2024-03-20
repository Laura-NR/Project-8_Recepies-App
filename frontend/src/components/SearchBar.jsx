import React from 'react';

export default function SearchBar({ onSearchChange }) {
    return (
        <>
        <div className="input-group">
            <input
                type="search"
                name="searchBar"
                id="searchBar"
                className="form-control"
                placeholder="Search recipes"
                onChange={(e) => onSearchChange(e.target.value)} // Call onSearchChange whenever the input changes
            />
            <button type="button" className="btn btn-primary">Search</button>
        </div>
        </>
    );
}
