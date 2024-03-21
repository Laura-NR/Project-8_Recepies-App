import React from 'react'; // Assuming you have these components
import '../TopBar.css';
import SearchBar from './SearchBar'; // And your custom search bar
import NewRecipe from './NewRecipe';
import Categories from './categories';
import LogoutButton from './LogoutButton';

function TopBar({ setShowAddForm, onSearchChange, onCategoryAdded, onLogout }) {
    return (
        <div className="top-bar">
            <div className="container-fluid">
                <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                        <div className="me-5">
                            <NewRecipe handleButtonClick={() => setShowAddForm(true)} />
                        </div>
                        <Categories onCategoryAdded={onCategoryAdded} />
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="me-3">
                            <SearchBar onSearchChange={onSearchChange} />
                        </div>
                        <LogoutButton onLogout={onLogout} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopBar;
