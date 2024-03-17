import React from 'react'; // Assuming you have these components
import '../TopBar.css';
import SearchBar from './SearchBar'; // And your custom search bar
import NewRecipe from './NewRecipe';
import Categories from './categories';

function TopBar({ setShowForm, onSearchChange }) {
    return (
        <div className="top-bar">
            <div className="container-fluid">
                <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                        <div className="me-5">
                            <NewRecipe handleButtonClick={() => setShowForm(true)} />
                        </div>
                        <Categories />
                    </div>
                    <div>
                        <SearchBar onSearchChange={onSearchChange} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopBar;
